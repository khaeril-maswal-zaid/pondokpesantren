<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class BlogController extends Controller
{
    public function index(): Response
    {
        $data = [
            'blogs' => Blog::select(['title', 'slug', 'user_id', 'visit', 'created_at'])->with('athor')->latest()->paginate(10),
        ];

        return Inertia::render('dashboard/blog/page', $data);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog): Response
    {
        // return Inertia::render('Blog/Show', [
        //     'blog' => $blog,
        // ]);

    }
}
