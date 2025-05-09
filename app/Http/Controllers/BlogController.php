<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
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
