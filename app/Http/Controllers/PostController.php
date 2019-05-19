<?php

namespace App\Http\Controllers;

use App\Http\Requests\ValidationPostsRequest;
use App\Post;
use App\User;
use Http\Client\Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


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

    /**
     *  @param  int $userId
     * @return \Illuminate\Http\Response
     */
    public function getAllPostByUserId($userId){
        try {
            $posts = User::find($userId)->posts()->get();
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
     * @param  \App\Http\Requests\ValidationPostsRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ValidationPostsRequest $request)
    {
        try {
            $userId = $request->input('user_id');
            $post = User::find($userId)->posts()->create($request->all());
            return response()->json($post);
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
     * @param  \App\Http\Requests\ValidationPostsRequest $request
     * @param  \App\Post $Post
     * @return \Illuminate\Http\Response
     */
    public function update(ValidationPostsRequest $request)
    {
        try {
            $post = Post::find($request->input('id'));
            $post->update($request->all());
            return response()->json($post);
        } catch (Exception $e) {
            Log::info('PostController update', [$e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Post::find($id)->delete();
            return response()->json($id);
        } catch (Exception $e) {
            Log::info('PostController destroy', [$e->getMessage()]);
        }
    }
}
