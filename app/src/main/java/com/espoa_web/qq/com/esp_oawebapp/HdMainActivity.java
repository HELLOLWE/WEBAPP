package com.espoa_web.qq.com.esp_oawebapp;

import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Rect;
import android.net.Uri;
import android.os.Bundle;
import android.support.design.widget.Snackbar;
import android.support.design.widget.TabLayout;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.StaggeredGridLayoutManager;
import android.support.v7.widget.Toolbar;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.espoa_web.qq.com.esp_oawebapp.adapter.RecyclerViewAdapter;
import com.espoa_web.qq.com.esp_oawebapp.adapter.RecyclerViewMyTaskAdapter;

import java.util.ArrayList;
import java.util.List;
/*帮助台主页面*/
public class HdMainActivity extends AppCompatActivity implements View.OnClickListener {
    private TabLayout mTabLayout;
    private ViewPager mViewPager;

    private LayoutInflater mInflater;
    private List<String>mTitleList=new ArrayList<>();/*页卡标题集合*/
    private View view1,view2;
    private List<View>mViewList=new ArrayList<>();/*页卡视图集合*/
    private ListView hdListView;
    private Toolbar mToolbar;
    private ImageButton backImage;
    private RecyclerView recyclerView;
    private RecyclerView recyclerView1;
    private List<String> datas;
    private int i=0;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_hd_main);
        /*设置独立布局让Title居中*/
        getSupportActionBar().setCustomView(R.layout.title_icon);
        getSupportActionBar().setDisplayOptions(android.support.v7.app.ActionBar.DISPLAY_SHOW_CUSTOM);
        mViewPager=(ViewPager)findViewById(R.id.vp_view);
        mTabLayout=(TabLayout)findViewById(R.id.tabs);

        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        mInflater=LayoutInflater.from(this);
        view1=mInflater.inflate(R.layout.tasklist_leftlayout,null);
        /*在加载视图卡时要关联视图卡中的相应控件*/
        recyclerView = (RecyclerView)view1.findViewById(R.id.recyclerView);//显示消息详情的listview
        view2=mInflater.inflate(R.layout.tasklist_rightlayout,null);
        recyclerView1 = (RecyclerView)view2.findViewById(R.id.recyclerView1);


        //添加页卡视图
        mViewList.add(view1);
        mViewList.add(view2);
        //添加页卡标题
        mTitleList.add("任务列表");
        mTitleList.add("我的任务");

        mTabLayout.setTabMode(TabLayout.MODE_FIXED);//将tab设置为系统默认显示方式
        mTabLayout.addTab(mTabLayout.newTab().setText(mTitleList.get(0)));
        mTabLayout.addTab(mTabLayout.newTab().setText(mTitleList.get(1)));
        MyPagerAdapter myPageAdapter=new MyPagerAdapter(mViewList);
        mTabLayout.setTabsFromPagerAdapter(myPageAdapter);
        mViewPager.setAdapter(myPageAdapter);//先给viewpager设置视图页面
        mTabLayout.setupWithViewPager(mViewPager);//将TabLayout和ViewPager关联起来。
        initWebView();
        InitRecyclerView();
    }

    private void initWebView() {
        WebView webViewLeft= (WebView)view1.findViewById(R.id.webview_hdmain_left);
        WebView webViewRight= (WebView)view2.findViewById(R.id.webview_hdmain_right);
        webViewLeft.getSettings().setJavaScriptEnabled(true);
        webViewRight.getSettings().setJavaScriptEnabled(true);
        webViewLeft.loadUrl("file:///android_asset/tab1_tasklist_pullrefresh.html");
        webViewRight.loadUrl("file:///android_asset/tab2_tasklist_pullrefresh.html");
        webViewLeft.setWebViewClient(new WebViewClient(){
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return super.shouldOverrideUrlLoading(view, url);
            }
        });
        webViewRight.setWebViewClient(new WebViewClient(){
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return super.shouldOverrideUrlLoading(view, url);
            }
        });
    }

    public void InitRecyclerView(){
        recyclerView.setLayoutManager(new StaggeredGridLayoutManager(1,StaggeredGridLayoutManager.VERTICAL));
        recyclerView1.setLayoutManager(new StaggeredGridLayoutManager(1,StaggeredGridLayoutManager.VERTICAL));
        initData();
        RecyclerViewAdapter adapter=new RecyclerViewAdapter(datas);
        RecyclerViewMyTaskAdapter myTaskAdapter=new RecyclerViewMyTaskAdapter(datas);
        recyclerView.setAdapter(adapter);
        recyclerView1.setAdapter(myTaskAdapter);

        SpacesItemDecoration decoration=new SpacesItemDecoration(12);
        recyclerView.addItemDecoration(decoration);
        recyclerView1.addItemDecoration(new SpacesItemDecoration(9));
         i++;
        adapter.setOnItemClickListener(new RecyclerViewAdapter.OnRecyclerViewItemClickListener() {

            @Override
            public void onItemClick(View view) {
                Snackbar.make(view,"你点击了第"+i+"项",Snackbar.LENGTH_LONG).show();
            }
        });

    }


    public class SpacesItemDecoration extends RecyclerView.ItemDecoration {
        private int space;
        public SpacesItemDecoration(int space) {
            this.space=space;
        }
        @Override
        public void getItemOffsets(Rect outRect, View view, RecyclerView parent, RecyclerView.State state) {
            outRect.left=space;
            outRect.right=space;
            outRect.bottom=space;
            if(parent.getChildAdapterPosition(view)==0){
                outRect.top=space;
            }
        }
    }
    public void initData(){
        datas = new ArrayList<String>();
        for(int i =0;i<13;i++){
            datas.add("ESP_OA青乾内部项目"+i);
        }
    }
    @Override
    public void onClick(View v) {
        switch (v.getId()){

        }
    }

    /*设置适配器*/
    class MyPagerAdapter extends PagerAdapter{
        private List<View> mViewList;

        public MyPagerAdapter(List<View> mViewList) {
            this.mViewList = mViewList;
        }

        @Override
        public int getCount() {
            return mViewList.size();//页卡数
        }

        @Override
        public boolean isViewFromObject(View view, Object object) {
            return view == object;//官方推荐写法
        }

        @Override
        public Object instantiateItem(ViewGroup container, int position) {
            container.addView(mViewList.get(position));//添加页卡
            return mViewList.get(position);
        }

        @Override
        public void destroyItem(ViewGroup container, int position, Object object) {
            container.removeView(mViewList.get(position));//删除页卡
        }

        @Override
        public CharSequence getPageTitle(int position) {
            return mTitleList.get(position);//页卡标题
        }

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_hdmian, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id=item.getItemId();
      if(id==android.R.id.home){
            onBackPressed();
        }else if(id==R.id.action_settings){
          Intent intent=new Intent(HdMainActivity.this,Commonality2Activity.class);
          intent.putExtra("Common2",3);
          startActivity(intent);
      }
        return super.onOptionsItemSelected(item);
    }
}
