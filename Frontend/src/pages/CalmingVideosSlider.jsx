// import React, { useState, useEffect } from 'react';

// const CalmingVideosSlider = () => {
//   const [videos, setVideos] = useState([]);

// useEffect(() => {
// const fetchVideos = async () => {
//   try {
//     const apiKey = 'AIzaSyApVeK3cmd63M7u-bh1MCKm-UwXRHfoQec'; 
//     const playlistId = 'PLQ_PIlf6OzqKdBTuABBCzazB4i732pNTa';
//     const maxResults = 20;

//     const response = await fetch(
//       `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&key=${apiKey}`
//     );

//   if (!response.ok) {
//     throw new Error('Failed to fetch videos');
//   }

//     const data = await response.json();
//     const videoItems = data.items.map(item => ({
//       id: item.snippet.resourceId.videoId,
//       title: item.snippet.title,
//       thumbnail: item.snippet.thumbnails.default.url,
//     }));

//     setVideos(videoItems);
//   } catch (error) {
//     console.error('Error fetching videos:', error);
//   }
// };

//   fetchVideos();
// }, []);

//   return (
//     <div className="calming-videos-slider">
//       <h2>Calming Videos</h2>
//       <div className="video-list">
//         {videos.map(video => (
//           <div key={video.id} className="video-card" data-title={video.title}>
//             <iframe
//               width="500px"
//               height="300px"
//               src={`https://www.youtube.com/embed/${video.id}`}
//               frameBorder="0"
//               allowFullScreen
//               title={video.title}
//             ></iframe>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CalmingVideosSlider;




import React from 'react';

const CalmingVideosSlider = () => {
  // List your local videos here
  const localVideos = [
    {
      id: "1",
      // title: "C1",
      url: "/calming_videos/C1.mp4",
    },
    {
      id: "2",
      // title: "C2",
      url: "/calming_videos/C2.mp4",
    },
    {
      id: "3",
      // title: "C3",
      url: "/calming_videos/C3.mp4",
    },
    {
      id: "4",
      // title: "C3",
      url: "/calming_videos/river.mp4",
    },   
    {
      id: "5",
      // title: "C5",
      url: "/calming_videos/Stress Relief Piano.mp4",
    }, 
    {
      id: "6",
      // title: "C4",
      url: "/calming_videos/C4.mp4",
    },    
   
    {
      id: "7",
      // title: "C6",
      url: "/calming_videos/Chirping Bird.mp4",
    },    
    {
      id: "8",
      // title: "C3",
      url: "/calming_videos/Wind blowing.mp4",
    },     
    {
      id: "9",
      // title: "C3",
      url: "/calming_videos/istockphoto-1404892505-640_adpp_is.mp4",
    },        
  ];

  return (
    <div className="calming-videos-slider p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Calming Videos</h2>
      <div className="video-list grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {localVideos.map(video => (
          <div key={video.id} className="video-card bg-white rounded shadow-md p-3">
            <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
            <video width="auto" height="260" controls>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalmingVideosSlider;
