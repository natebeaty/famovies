<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Statamic\Facades\Entry;

class UpdateVideoDateField extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-video-date-field';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set Video Date field based on first year in title';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Fetch all entries from the 'posts' collection
        $posts = Entry::query()->where('collection', 'posts')->get();
        $updated = 0;
        foreach ($posts as $post) {
            if (empty($post['video_date']) && preg_match('/([\d]{4})/', $post['title'], $m)) {
                $post->set('video_date', $m[0].'-01-01');
                $post->save();
                $updated++;
            } else {
                $this->info("video_date = {$post['video_date']} : {$post['title']} ");
            }
        }
        $this->info("Updated the Video Date for {$updated} posts.");
    }
}
