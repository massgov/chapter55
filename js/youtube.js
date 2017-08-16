// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var Lukas, Governor, Wakeman, Sue, Cotto;
      function onYouTubeIframeAPIReady() {
        Lukas = new YT.Player('lukas', {
          videoId: 'KOtampX2KC4',
          height: '100%',
          width: '100%',
          playerVars: {rel: 0}
        });

        Governor = new YT.Player('governor', {
          height: '390',
          width: '640',
          videoId: 'U3byQoBJBKE',
          playerVars: {rel: 0}
        });

        Wakeman = new YT.Player('wakeman', {
          height: '390',
          width: '640',
          videoId: 'DRWOZCcf7Eo',
          playerVars: {rel: 0}
        });

        Sue = new YT.Player('sue', {
          height: '390',
          width: '640',
          videoId: 'JrmGrxCgHZk',
          playerVars: {rel: 0}
        });

        Cotto = new YT.Player('cotto', {
          height: '390',
          width: '640',
          videoId: 'kK2aQuFahok',
          playerVars: {rel: 0}
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
        console.log(event);
      }


      if ($(window).width() > 991) {
          // Disable on mobile
          $('.js-play-video').click(function(e) {
              var $target = $(e.target).data('target');
              var which_container = document.getElementById($target);
              eval($target).playVideo();
          });
      };
