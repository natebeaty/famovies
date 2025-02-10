<?php

namespace App\Modifiers;

use Statamic\Modifiers\Modifier;

/**
 * Modifier to extract a YouTube ID from a URL (used to get poster image, which I guess maybe this should do everything here)
 */
class GetYoutubeId extends Modifier
{
    public function index($url, $params)
    {
        if (preg_match('/(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^\?&"\'>]+)/', $url, $m)) {
            $return = $m[5];
        } else {
            $return = $url;
        }
        return $return;
    }
}
