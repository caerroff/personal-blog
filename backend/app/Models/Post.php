<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * @var text
     */
    public $content = "";

    /**
     * @var string
     */
    public $title;

    public $timestamps = true;
}
