package com.mitpro.watchit;

import android.content.Context;
import android.content.pm.ActivityInfo;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.CollapsingToolbarLayout;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.FrameLayout;
import android.widget.MediaController;
import android.widget.RelativeLayout;
import android.widget.Toast;
import android.widget.VideoView;


public class MovieDetailActivity extends AppCompatActivity {
    public static final String EXTRA_MOVIE = "movie";

    private Movie mMovie;

    public VideoView videoView = null;



    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_movie_detail);
        if (getIntent().hasExtra(EXTRA_MOVIE))
        {
            mMovie = getIntent().getParcelableExtra(EXTRA_MOVIE);
        }
        else
        {
            throw new IllegalArgumentException("Detail activity must receive a movie parcelable");
        }


        CharSequence text = "אנא המתן, הסרט נטען, אנא וודא חיבור אינטרנט תקין";
        Toast toast = Toast.makeText(getApplicationContext(), text, Toast.LENGTH_LONG);
        toast.show();



        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);



        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        CollapsingToolbarLayout toolbarLayout = (CollapsingToolbarLayout) findViewById(R.id.toolbar_layout);
        toolbarLayout.setTitle(mMovie.getTitle());



        videoView = (VideoView) findViewById(R.id.videoView1);
        final MyMediaController videoController = new MyMediaController(this, (FrameLayout) findViewById(R.id.controllerAnchor));
        videoView.setMediaController(videoController);


        videoView.setVideoURI(Uri.parse(mMovie.getSoruces()));



        videoView.setOnPreparedListener(new MediaPlayer.OnPreparedListener()
        {
            @Override
            public void onPrepared(MediaPlayer mp)
            {
                videoView.start();
                FrameLayout controllerAnchor = (FrameLayout) findViewById(R.id.controllerAnchor);
                videoController.setAnchorView(controllerAnchor);
            }
        });



        //Picasso.with(this).load(mMovie.getPoster()).into((ImageView)findViewById(R.id.backdrop));
    }



    public class MyMediaController extends MediaController
    {
        private FrameLayout anchorView;


        public MyMediaController(Context context, FrameLayout anchorView)
        {
            super(context);
            this.anchorView = anchorView;
        }

        @Override
        protected void onSizeChanged(int xNew, int yNew, int xOld, int yOld)
        {
            super.onSizeChanged(xNew, yNew, xOld, yOld);

            RelativeLayout.LayoutParams lp = (RelativeLayout.LayoutParams) anchorView.getLayoutParams();
            lp.setMargins(0, 0, 0, yNew);

            anchorView.setLayoutParams(lp);
            anchorView.requestLayout();
        }
    }


}
