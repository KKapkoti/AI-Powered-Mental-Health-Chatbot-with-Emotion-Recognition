import React from 'react';

const MeditationResources = () => {
  const resources = [
    {
      type: 'article',
      title: 'Mindfulness Meditation: Sukhasana(Easy Pose)',
      // link: 'https://greatergood.berkeley.edu/article/item/five_ways_mindfulness_meditation_is_good_for_your_health',
      gifLink: 'https://skyogafoundation.org/assets/images/silence.gif',
    },
    {
      type: 'article',
      title: 'Advanced Inversion Yoga Pose: Adho Mukha Vrksasana (Handstand)',
      // link: 'https://www.healthline.com/nutrition/13-benefits-of-yoga',
      gifLink: 'https://media2.giphy.com/media/lSodnhEO8lphSsxEUy/giphy.gif',
      // videoLink: '/excercise videos/1.mp4',
    },
    {
      type: 'article',
      title: 'Beginner Yoga Poses for Relaxation: Utthita Parsvakonasana (Extended Side Angle Pose)',
      // link: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1470658/',
      gifLink: 'https://media2.giphy.com/media/0YLKvc5TheGFh0GJXk/giphy.gif?cid=6c09b952qk938cnspzz9y9uizfrkj2pf750f3dvpmvpmag4p&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s',
    },
    {
      type: 'article',
      title: 'Meditation for Slowing Thoughts: Virabhadrasana II (Warrior II Pose) ',
      // link: 'https://www.youtube.com/watch?v=79r4jlECyTs',
      gifLink: 'https://media4.giphy.com/media/Mb42X7rqa0H7YlJsiz/source.gif',
    },
    // {
    //   type: 'article',
    //   title: 'Beginner Yoga Poses for Relaxation',
    //   link: 'https://www.yogajournal.com/poses/yoga-by-benefit/calm/yoga-poses-for-relaxation/',
    //   gifLink: 'https://ub24news.com/wp-content/uploads/2019/06/source-min.gif',
    // },
    {
      type: 'article',
      title: 'Exercise for Stress Relief: Standing Pose or Light Aerobic Stretch ',
      // link: 'https://www.everydayhealth.com/exercise-photos/exercises-that-relieve-stress.aspx',
      gifLink: 'https://d2f8l4t0zpiyim.cloudfront.net/000_clients/61768/page/61768yYxIEAka.gif',
    },
    {
      type: 'article',
      title: ' Energizing and Good for Mental Clarity: Urdhva Hastasana (Upward Salute) or Standing Stretch ',
      // link: 'https://www.houstonmethodist.org/blog/articles/2021/sep/the-benefits-of-yoga-how-it-boosts-your-mental-health/',
      gifLink: 'https://media4.giphy.com/media/KDICL3psaxnoeUghMt/giphy.gif?cid=6c09b9525f4v3rtu08oa8spjfefqfmvdbxvlwsnvdzj8h5a1&ep=v1_stickers_related&rid=giphy.gif&ct=s',
    },
    {
      type: 'article',
      title: 'Improves Balance and Mental Focus: Vrikshasana (Tree Pose) ',
      // link: 'https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response/?gclid=Cj0KCQjwi7GnBhDXARIsAFLvH4mc1N99ys4yWNA0XO_7kpg4jUEvAREYIDKA3dB70XgtSkbWwBA-BpsaAumVEALw_wcB',
      gifLink: 'https://media1.giphy.com/media/19ukzJdtWrkV2dy2eE/source.gif',
    },
    {
      type: 'article',
      title: 'Meditation and Mental Peace: Sukhasana (Easy Pose) with Dhyana Mudra',
      // link: 'https://www.outlookindia.com/healths/world-mental-health-day-how-does-daily-meditation-really-help-us--news-219648',
      gifLink: 'https://media2.giphy.com/media/GD32HNX7JduZBfHIdZ/giphy.gif',
    },
  ];

  return (
    <div className="meditation-resources">
      <h2>Meditation, Yoga, Exercises and more...</h2>
      <div className="resource-slider" >
        {resources.map((resource, index) => (
          <div key={index} className="resource-card" resource-title={resource.title}>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              <img src={resource.gifLink} alt={resource.title} />
              <h4>{resource.title}</h4>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeditationResources;
