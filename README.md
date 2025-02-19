## Famovies

Simple statamic site to host digitized 8mm, super 8 + vhs movies from my family's archives.

Low tech deploy: 
`bun run build && php please ssg:generate --workers=8 && chmod 755 storage/app/static && cd storage/app/static/ && mkdir page && mv 1 2 3 page/ && rsync -avz --delete ./ natebeaty@famovies.clixel.com:apps/famovies-static/ && cd ../../..`

Extract a thumbnail from 30s in:
`ffmpeg -ss 30 -i reel.mp4 -vframes 1 -q:v 2 reel.jpg`
