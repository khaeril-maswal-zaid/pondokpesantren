<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBlogRequest;
use App\Http\Requests\UpdateBlogRequest;
use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class BlogController extends Controller
{
    public function index(): Response
    {
        $data = [
            'blogs' => Blog::select(['title', 'slug', 'user_id', 'visit', 'category', 'created_at'])->with('author')->latest()->paginate(10),
        ];

        return Inertia::render('dashboard/blog/page', $data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog): Response
    {
        $ogTags = [
            'title' => $blog->title,
            'description' => Str::limit(strip_tags($blog->excerpt), 200),
            'image' => asset('storage/' . $blog->picture1),
            'url' => route('blog.show', $blog),
        ];
        request()->attributes->set('og', $ogTags);

        $blog->update([
            'visit' => $blog->visit + 1
        ]);

        $kategory = ['News', 'Dakwah', 'Opini', 'The Story'];

        $countKategory = [];
        foreach ($kategory as $key => $value) {
            $countKategory[] = Blog::where('category', $value)->count();
        }

        $data = [
            'article' => $blog->load('author'),
            'relatedPosts' => Blog::select('title', 'slug', 'picture1', 'category', 'created_at')->whereNot('slug', $blog->slug)->latest()->take(4)->get(),
            'kategory' =>  $kategory,
            'countKategory' => $countKategory,
            'tagsRandom' =>  Blog::inRandomOrder()->limit(2)->pluck('tags')
        ];
        return Inertia::render('ponpes/blog/detail', $data);
    }


    public function store(StoreBlogRequest $request)
    {
        $base64Image = $request->mainImage;
        [$type, $data] = explode(';', $base64Image);
        [, $extension] = explode('/', $type); // jpeg, png
        [, $base64Data] = explode(',', $data);

        $filename = uniqid() . '-' . Str::slug($request->nama) . '.' . $extension;

        Storage::disk('public')->put("image/blog/{$filename}", base64_decode($base64Data));

        $imagePath = "image/blog/{$filename}";

        Blog::create([
            'user_id' => Auth::id(),
            'slug' => Str::slug($request->title, '-'),
            'title' => $request->title,
            'excerpt' => $request->description,
            'body1' => $request->body1,
            'body2' => $request->body2,
            'picture1' => $imagePath,
            'picture2' => '',
            'picture3' => '',
            'tags' => $request->tags,
            'category' => $request->category,
            'visit' => 50
        ]);
    }

    public function cards()
    {
        $data = [];
        // return Inertia::render('ponpes/agenda/page', $data);
    }

    public function edit(Blog $blog): Response
    {
        $data = [
            'blogs' => $blog,
        ];

        return Inertia::render('dashboard/blog/edit', $data);
    }

    public function update(UpdateBlogRequest $request, Blog $blog)
    {
        $fotoInput = $request->input('mainImage');

        // Cek apakah $fotoInput ini Base64 (diawali "data:image/…;base64,")
        if (preg_match('/^data:image\/(\w+);base64,/', $fotoInput, $matches)) {
            $base64Image = $request->mainImage;
            [$type, $data] = explode(';', $base64Image);
            [, $extension] = explode('/', $type); // jpeg, png
            [, $base64Data] = explode(',', $data);

            $filename =  Str::slug($request->title) . '-' . uniqid() . '.' . $extension;

            Storage::disk('public')->put("image/blog/{$filename}", base64_decode($base64Data));

            $imagePath = "image/blog/{$filename}";

            // Hapus file gambar sebelumnnya jika ada
            if ($blog->picture1 && Storage::disk('public')->exists($blog->picture1)) {
                Storage::disk('public')->delete($blog->picture1);
            }
        } else {
            // bukan Base64 → kemungkinan path lama yang tidak diubah
            $imagePath = $fotoInput;
        }

        $blog->update([
            'title' => $request->title,
            'excerpt' => $request->description,
            'body1' => $request->body1,
            'body2' => $request->body2,
            'picture1' => $imagePath,
            'picture2' => '',
            'picture3' => '',
            'tags' => $request->tags,
            'visit' => 50
        ]);

        return to_route('blog.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        // Hapus file gambar jika ada
        if ($blog->picture1 && Storage::disk('public')->exists($blog->picture1)) {
            Storage::disk('public')->delete($blog->picture1);
        }

        if ($blog->picture2 && Storage::disk('public')->exists($blog->picture2)) {
            Storage::disk('public')->delete($blog->picture2);
        }

        if ($blog->picture3 && Storage::disk('public')->exists($blog->picture3)) {
            Storage::disk('public')->delete($blog->picture3);
        }

        $blog->delete();
    }
}
