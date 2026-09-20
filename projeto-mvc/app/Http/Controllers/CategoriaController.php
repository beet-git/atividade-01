<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Produto;

class CategoriaController extends Controller
{
    public function index()
    {
        $categorias = Categoria::orderBy('id')->get();

        return view('categorias.index', compact('categorias'));
    }

    public function show($id)
    {
        $categoria = Categoria::findOrFail($id);

        $produtos = Produto::where(
            'categoria',
            $categoria->nome
        )->get();

        return view(
            'categorias.show',
            compact('categoria', 'produtos')
        );
    }
}
