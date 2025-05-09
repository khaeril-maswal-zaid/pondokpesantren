import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';

export default function TrailingStopMonitor() {
    const [tdPercent, setTdPercent] = useState(0.6);
    const [limit, setLimit] = useState(10000);
    const [amount, setAmount] = useState(0.1);
    const [type, setType] = useState('sell');
    const [startDate, setStartDate] = useState('');
    const [historicalHigh, setHistoricalHigh] = useState(null);
    const [triggerPrice, setTriggerPrice] = useState(null);
    const [realTimePrice, setRealTimePrice] = useState(null);
    const [triggeredAt, setTriggeredAt] = useState(null);
    const [highestAt, setHighestAt] = useState(null);
    const [executed, setExecuted] = useState(false);
    const intervalRef = useRef(null);

    const calculateTrigger = (high) => {
        return parseFloat((high - (tdPercent / 100) * high).toFixed(2));
    };

    const fetchHistoricalData = async () => {
        const startTimestamp = new Date(startDate).getTime();
        const endTimestamp = Date.now();

        // Fetch historical 1m klines
        const klinesUrl = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&startTime=${startTimestamp}&endTime=${endTimestamp}`;
        const klinesRes = await fetch(klinesUrl);
        const klines = await klinesRes.json();

        let maxPrice = 0;
        let maxTime = null;
        klines.forEach(([time, , high]) => {
            const price = parseFloat(high);
            if (price > maxPrice) {
                maxPrice = price;
                maxTime = time;
            }
        });

        // Also consider current live price as potential high
        const tickerRes = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
        const tickerData = await tickerRes.json();
        const currentLive = parseFloat(tickerData.price);
        if (currentLive > maxPrice) {
            maxPrice = currentLive;
            maxTime = Date.now();
        }

        const trigger = calculateTrigger(maxPrice);

        setHistoricalHigh(maxPrice);
        setHighestAt(new Date(maxTime).toLocaleString());
        setTriggerPrice(trigger);
    };

    const fetchRealTimePrice = async () => {
        try {
            const res = await fetch('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
            const data = await res.json();
            const currentPrice = parseFloat(data.price);
            setRealTimePrice(currentPrice);

            // Update trailing if a new high is reached
            if (historicalHigh != null && currentPrice > historicalHigh) {
                setHistoricalHigh(currentPrice);
                setHighestAt(new Date().toLocaleString());
                setTriggerPrice(calculateTrigger(currentPrice));
            }

            // Check execution
            if (!executed && triggerPrice != null) {
                if (type === 'sell' && currentPrice <= triggerPrice) {
                    setTriggeredAt(new Date().toLocaleString());
                    setExecuted(true);
                }
                if (type === 'buy' && currentPrice >= triggerPrice) {
                    setTriggeredAt(new Date().toLocaleString());
                    setExecuted(true);
                }
            }
        } catch (e) {
            console.error('Error fetching real-time price', e);
        }
    };

    useEffect(() => {
        if (startDate) {
            fetchHistoricalData();
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(fetchRealTimePrice, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [startDate, tdPercent]);

    return (
        <div className="mx-auto max-w-2xl space-y-4 p-4">
            <h1 className="text-xl font-bold">BTC Trailing Stop Monitor</h1>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium">Trailing Deviation (%)</label>
                    <Input type="number" step="0.01" value={tdPercent} onChange={(e) => setTdPercent(parseFloat(e.target.value))} />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Limit (USDT)</label>
                    <Input type="number" value={limit} onChange={(e) => setLimit(parseFloat(e.target.value))} />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Jumlah (BTC)</label>
                    <Input type="number" step="0.0001" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium">Tipe Order</label>
                    <select className="w-full rounded border p-2" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="sell">Jual</option>
                        <option value="buy">Beli</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="mb-1 block text-sm font-medium">Tanggal Mulai Trailing</label>
                    <Input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
            </div>

            <Button onClick={fetchHistoricalData}>Mulai Analisis</Button>

            <div className="space-y-2">
                <div>Harga Tertinggi: {historicalHigh ?? '-'}</div>
                <div>Waktu Harga Tertinggi: {highestAt ?? '-'}</div>
                <div>Harga Pemicu: {triggerPrice ?? '-'}</div>
                <div>Harga BTC Saat Ini: {realTimePrice ?? '-'}</div>
                <div>Status Eksekusi: {executed ? `Tereksekusi pada ${triggeredAt}` : 'Belum tereksekusi'}</div>
            </div>
        </div>
    );
}
