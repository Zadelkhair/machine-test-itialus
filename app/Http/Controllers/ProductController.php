<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{

    public function all(Request $request)
    {
        return \App\Models\Product::all();
    }

    public function get(Request $request)
    {
        $response = array('data' => '', 'success'=>false);

        $validator = Validator::make($request->all(), [
            'id' => ['required'],
        ]);

        if ($validator->fails()) {

            $response['data'] = $validator->messages();

        } else {

            $product = \App\Models\Product::where('id',$request->id)->first();

            if($product != null){
                $response['success'] = true;
                $response['data'] = $product;
            }
            else{
                $response['data'] = 'Product not exist';
            }

        }

        return $response;
    }

    public function find(Request $request)
    {
        $response = array('data' => '', 'success'=>false);

        $validator = Validator::make($request->all(), [
            'by' => ['required'],
            'value' => ['required']
        ]);

        if ($validator->fails()) {

            $response['data'] = $validator->messages();

        } else {

            $products = \App\Models\Product::where($request->by,$request->value)->get();

            if($products != null){
                $response['success'] = true;
                $response['data'] = $products;
            }
            else{
                $response['data'] = 'There is no product with this proprieties';
            }

        }

        return $response;
    }


    public function store(Request $request)
    {
        $response = array('data' => '', 'success'=>false);

        $validator = Validator::make($request->all(), [
            'name'=>['required'],
            'category'=>['required'],
            'quantity'=>['required'],
            'status'=>['required']
        ]);

        if ($validator->fails()) {

            $response['data'] = $validator->messages();

        } else {

            $product = \App\Models\Product::create($request->all());

            if($product != null){
                $response['success'] = true;
                $response['data'] = $product;
            }
            else{
                $response['data'] = 'Somthing wrong';
            }

        }

        return $response;
    }


    public function update(Request $request)
    {
        $response = array('data' => '', 'success'=>false);

        $validator = Validator::make($request->all(), [
            'id'=>['required']
        ]);

        if ($validator->fails()) {

            $response['data'] = $validator->messages();

        } else {

            $product = \App\Models\Product::where('id',$request->id)->first();

            if($product != null){

                $product->update($request->all());

                if($product != null){
                    $response['success'] = true;
                    $response['data'] = $product;
                }
                else{
                    $response['data'] = 'Somthing wrong';
                }

            }
            else{
                $response['data'] = 'Product not exist';
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

            $product = \App\Models\Product::where('id',$request->id)->first();

            if($product != null){

                $product->delete();

                if($product != null){
                    $response['success'] = true;
                    $response['data'] = $product;
                }
                else{
                    $response['data'] = 'Somthing wrong';
                }

            }
            else{
                $response['data'] = 'Product not exist';
            }


        }

        return $response;
    }
}
