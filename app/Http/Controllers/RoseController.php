<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoseController extends Controller
{
    function index(){
    	return \View::make('rose.index');
    }

    function custom(){
    	return \View::make('rose.custom');
    }
}
