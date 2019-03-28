<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidationPosts;
use App\Post;
use Http\Client\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       //
    }

    public function getAllPostByUserId(Request $request){
        try {
            $posts = Post::whereUserId($request->input('userId'))->get();
            return response()->json($posts);
        } catch (Exception $e) {
            Log::info('PostController getAllPostByUserId', [$e->getMessage()]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(ValidationPosts $request)
    {
        try {
            $item = new Post($request->all());
            $item->save();
            return response()->json($item);
        } catch (Exception $e) {
            Log::info('PostController store', [$e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Post $Post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $Post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post $Post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $Post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \App\Post $Post
     * @return \Illuminate\Http\Response
     */
    public function update(ValidationPosts $request, $id)
    {
        try {
            $item = Post::where('id', $id)->first();
            $item->fill($request->all());
            $item->save();
            return response()->json($item);
        } catch (Exception $e) {
            Log::info('PostController update', [$e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post $Post
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $post = Post::find($id);
            $post->delete();
            return response()->json($id);
        } catch (Exception $e) {
            Log::info('PostController destroy', [$e->getMessage()]);
        }
    }
}
