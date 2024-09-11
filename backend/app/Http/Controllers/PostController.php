<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PostController extends Controller
{
    public static function getAll()
    {
        $data = [];
        $data['entity'] = Post::all();
        $data['status'] = 200;
        return new JsonResponse($data);
    }

    public static function get(int $id)
    {
        $data = [];
        $data['entity'] = Post::query()->where('id', '=', $id);
        $found = Post::query()->where('id', '=', $id) == null;
        
        if(!$found){
            $data['status'] = 204;
        }else{
            $data['status'] = 200;
        }
        return new JsonResponse($data);
    }

    public static function new(Request $request)
    {
        dd($request);
    }

    public static function update(Request $request)
    {

    }

    public static function delete(int $id)
    {
        Post::destroy($id);
        return Response();
    }
}
