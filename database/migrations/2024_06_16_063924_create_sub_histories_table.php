<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sub_histories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->string('history_text');
            $table->integer('sub_history_order');
            $table->string('start');
            $table->string('end');
            $table->boolean('to_now')->default(false);
            $table->foreignId('history_id')->constrained('histories');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sub_histories');
    }
};
