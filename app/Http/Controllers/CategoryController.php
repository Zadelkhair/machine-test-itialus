<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{

    public function all(Request $request)
    {
        return \App\Models\Category::all();
    }

    public function store(Request $request)
    {
        $response = array('data' => '', 'success'=>false);

        $validator = Validator::make($request->all(), [
            'name'=>['required'],
        ]);

        if ($validator->fails()) {
            $response['data'] = $validator->messages();
        } else {
            $category = \App\Models\Category::create($request->all());

            if ($category != null) {
                $response['success'] = true;
                $response['data'] = $category;
            } else {
                $response['data'] = 'Somthing wrong';
            }
        }

        return $response;
    }

    public function delete(Request $request)
    {
        $response = array('data' => '', 'success'=>false);

        $validator = Validator::make($request->all(), [
            'id'=>['required']
        ]);

        if ($validator->fails()) {
            $response['data'] = $validator->messages();
        } else {
            $category = \App\Models\Category::where('id', $request->id)->first();

            if ($category != null) {
                $category->delete();

                if ($category != null) {
                    $response['success'] = true;
                    $response['data'] = $category;
                } else {
                    $response['data'] = 'Somthing wrong';
                }
            } else {
                $response['data'] = 'Category not exist';
            }
        }

        return $response;
    }

}
