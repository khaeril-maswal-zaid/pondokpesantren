<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;


class BlogController extends Controller
{
    public function index()
    {
        $data = [
            'blogs' => Blog::select(['title', 'slug', 'user_id', 'visit', 'created_at'])->with('athor')->latest()->paginate(10),
        ];

        return Inertia::render('dashboard/blog/page', $data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        // return Inertia::render('Blog/Show', [
        //     'blog' => $blog,
        // ]);

    }
}
