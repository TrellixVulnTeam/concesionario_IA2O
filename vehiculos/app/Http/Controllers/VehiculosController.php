<?php

namespace App\Http\Controllers;

use App\Models\vehiculos;
use App\Http\Controllers\Controller;
use App\Http\Requests\storeVehiculosPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VehiculosController extends Controller
{
    public function agregarvehiculo(Request $request)
    {
        $rules = [
            'id'        => 'required',
            'nombre'        => 'required',
            'categoria'        => 'required',
            'marca'   => 'required',
            'Precio'   => 'required',
            'img'               => 'required'
        ];

        #Paso1-. Validación de los campos del usuario
        $input = $request->all();
        $validator = Validator::make($input, $rules);
//        dd($validator->errors());
        if ($validator->fails()){
            return response()->json([
                'status' => 'error',
                'message' => $input,
                'errors'=> $validator->errors()
            ], 200);
        }

        $vehiculo = vehiculos::create(array(
            'id'        => $request->input('id'),
            'nombre'        => $request->input('nombre'),
            'marca'        => $request->input('marca'),
            'categoria'        => $request->input('categoria'),
            'precio'   => $request->input('Precio'),
            'img'               => $request->input('img')
        ));

        return response()->json([
            'status' => 'Correcto.',
            'message' => 'Vehiculo agregado.'], 201);
    }

    public function destroy($id){
       $data = vehiculos::destroy('id','=', $id);
       return  response()->json([
        'status' => 'success',
        'message' => 'Vehiculo '. $id .' borrado correctamente ',
        'code' => 401,
        'data' => $data
    ]);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehiculos = vehiculos::with('miscategorias')->get();
        return  response()->json($vehiculos);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\vehiculos  $vehiculos
     * @return \Illuminate\Http\Response
     */
    public function show(vehiculos $vehiculos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\vehiculos  $vehiculos
     * @return \Illuminate\Http\Response
     */
    public function edit(vehiculos $vehiculos)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\vehiculos  $vehiculos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, vehiculos $vehiculos)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\vehiculos  $vehiculos
     * @return \Illuminate\Http\Response
     */
    
}
