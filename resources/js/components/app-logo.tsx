import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const { name } = usePage().props;
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md">
                <img src="/storage/image/assets/logo.png" alt="" className="size-7" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">{name}</span>
            </div>
        </>
    );
}
