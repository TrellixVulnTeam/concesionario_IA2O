<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clientes', function (Blueprint $table) {
            $table->integer('Codigo')->primary();
            $table->string('Nombre', 50);
            $table->string('Telefono',15);
            $table->double('LimiteCredito',15,2);
            $table->SmallInteger('userid')->nullable();
            $table->string('Direccion',50);
            $table->string('Ciudad',50);
            $table->string('Pais',50);
            $table->string('CodigoPostal',10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('clientes');
    }
}
