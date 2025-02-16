<?php

use Illuminate\Support\Facades\Route;

// Route::statamic('example', 'example-view', [
//    'title' => 'Example'
// ]);

Route::statamic('posts/archive', 'posts/archive')->name('archive');
Route::statamic('posts/type/{type}', 'type')->name('posts.type');
Route::statamic('sitemap.xml', 'sitemap', ['content_type' => 'text/xml'])->name('sitemap');
Route::statamic('feed.xml', 'feed', ['content_type' => 'text/xml'])->name('feed');
