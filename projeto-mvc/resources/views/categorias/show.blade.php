@extends('layouts.app')

@section('content')
<h1>{{ $categoria->nome }}</h1>

<p>{{ $categoria->descricao }}</p>

<h2>Produtos</h2>

<ul>
@foreach ($produtos as $produto)
    <li>
        {{ $produto->nome }} - R$ {{ number_format($produto->preco, 2, ',', '.') }}
    </li>
@endforeach
</ul>

<a href="/categorias">Voltar</a>
@endsection
