package com.espoa_web.qq.com.esp_oawebapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.CookieManager;
import android.webkit.GeolocationPermissions;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

public class Commonality2Activity extends AppCompatActivity {
    WebView webView_child2;
    int pageid;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_commonality2);
        webView_child2=(WebView)findViewById(R.id.webview_child2);
        webView_child2.getSettings().setJavaScriptEnabled(true);
        webView_child2.getSettings().setUseWideViewPort(true);
        webView_child2.setBackgroundColor(0x00000000);
        webView_child2.setHorizontalScrollBarEnabled(false);
        webView_child2.getSettings().setDefaultFontSize(16);
        webView_child2.getSettings().setBuiltInZoomControls(false);
        webView_child2.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        webView_child2.getSettings().setGeolocationEnabled(true);
        pageid=getIntent().getIntExtra("Common2",0);
        Log.i("","ActivityID:"+pageid);
        if(pageid==1){
            getSupportActionBar().setTitle("工作报告");
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            webView_child2.loadUrl("file:///android_asset/pagewriteform.html");
        }
        if(pageid==2){
            getSupportActionBar().setTitle("移动打卡");
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            webView_child2.loadUrl("file:///android_asset/qiandaopage.html");
        }
        if(pageid==3){
            getSupportActionBar().setTitle("创建任务");
            getSupportActionBar().setDisplayHomeAsUpEnabled(true);
            webView_child2.loadUrl("file:///android_asset/hd_createtask.html");
        }
        webView_child2.setWebChromeClient(new WebChromeClient(){
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                callback.invoke(origin, true, false);
                super.onGeolocationPermissionsShowPrompt(origin, callback);
            }

            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                return super.onJsAlert(view, url, message, result);
            }
        });
        webView_child2.setWebViewClient(new WebViewClient(){
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return super.shouldOverrideUrlLoading(view, url);
            }

            @Override
            public void onLoadResource(WebView view, String url) {
                super.onLoadResource(view, url);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                CookieManager cookieManager = CookieManager.getInstance();
                String CookieStr = cookieManager.getCookie(url);
                super.onPageFinished(view, url);
            }
        });

    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_hdmian,menu);
        return true;
    }
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id=item.getItemId();
        if(id==android.R.id.home){
            onBackPressed();
        }
        if(id==R.menu.menu_hdmian){
            Toast.makeText(Commonality2Activity.this,"这是帮助台的额消息创建按钮",Toast.LENGTH_LONG).show();
        }
        return super.onOptionsItemSelected(item);
    }
}
