const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://db.kmzcbwiqlfdcrqqndglm.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttemNid2lxbGZkY3JxcW5kZ2xtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTM3NTk3NCwiZXhwIjoyMDUwOTUxOTc0fQ.3SJRzMHI0iVAJl-1nN-LVqSGQ3XhoBwzh67b0nkGLnU'
);

async function checkN8nData() {
  console.log('=== Checking n8n Workflow Data in Supabase ===\n');

  // Check total video tutorials
  const { data: allVideos, error: allError } = await supabase
    .from('resources')
    .select('id', { count: 'exact', head: true })
    .eq('category', 'video-tutorials');

  if (allError) {
    console.log('❌ Error checking total videos:', allError.message);
  } else {
    console.log(`✅ Total video tutorials in database: ${allVideos?.length || 0}`);
  }

  // Check recent videos (last 24 hours)
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: recentVideos, error: recentError } = await supabase
    .from('resources')
    .select('title, channel_name, published_at, created_at, tags')
    .eq('category', 'video-tutorials')
    .gte('created_at', yesterday)
    .order('created_at', { ascending: false });

  if (recentError) {
    console.log('❌ Error checking recent videos:', recentError.message);
  } else {
    console.log(`\n📊 Videos added in last 24 hours: ${recentVideos?.length || 0}`);
    if (recentVideos && recentVideos.length > 0) {
      console.log('\nRecent videos:');
      recentVideos.forEach((video, idx) => {
        console.log(`${idx + 1}. ${video.title}`);
        console.log(`   Channel: ${video.channel_name}`);
        console.log(`   Tags: ${video.tags?.join(', ') || 'No tags'}`);
        console.log(`   Added: ${new Date(video.created_at).toLocaleString()}`);
        console.log('');
      });
    }
  }

  // Check latest 10 videos overall
  const { data: latestVideos, error: latestError } = await supabase
    .from('resources')
    .select('title, channel_name, published_at, created_at, tags')
    .eq('category', 'video-tutorials')
    .order('created_at', { ascending: false })
    .limit(10);

  if (latestError) {
    console.log('❌ Error checking latest videos:', latestError.message);
  } else {
    console.log('\n🎬 Latest 10 videos in database:');
    latestVideos?.forEach((video, idx) => {
      console.log(`${idx + 1}. ${video.title}`);
      console.log(`   Channel: ${video.channel_name}`);
      console.log(`   Tags: ${video.tags?.join(', ') || 'No tags'}`);
      console.log(`   Added: ${new Date(video.created_at).toLocaleString()}`);
      console.log('');
    });
  }

  // Check channels distribution
  const { data: channels, error: channelsError } = await supabase
    .from('resources')
    .select('channel_name')
    .eq('category', 'video-tutorials');

  if (!channelsError && channels) {
    const channelCounts = channels.reduce((acc, video) => {
      acc[video.channel_name] = (acc[video.channel_name] || 0) + 1;
      return acc;
    }, {});

    console.log('\n📺 Videos by Channel:');
    Object.entries(channelCounts)
      .sort((a, b) => b[1] - a[1])
      .forEach(([channel, count]) => {
        console.log(`   ${channel}: ${count} videos`);
      });
  }
}

checkN8nData().catch(console.error);
