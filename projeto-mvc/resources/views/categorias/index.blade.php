@extends('layouts.app')

@section('content')
<h1>Categorias</h1>

<ul>
@foreach ($categorias as $categoria)
    <li>
        <a href="/categorias/{{ $categoria->id }}">
            {{ $categoria->nome }}
        </a>
        - {{ $categoria->descricao }}
    </li>
@endforeach
</ul>
@endsection
