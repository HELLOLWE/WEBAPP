package com.espoa_web.qq.com.esp_oawebapp;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.webkit.CookieManager;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.JsResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.espoa_web.qq.com.esp_oawebapp.tool.DoubleClickExitHelper;

public class CommonalityActivity extends AppCompatActivity {
    WebView webView_child;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);
        webView_child=(WebView)findViewById(R.id.webview_child);
        webView_child.getSettings().setJavaScriptEnabled(true);
        webView_child.getSettings().setUseWideViewPort(true);
        webView_child.setBackgroundColor(0x00000000);
        webView_child.setHorizontalScrollBarEnabled(false);
        webView_child.getSettings().setDefaultFontSize(16);
        webView_child.getSettings().setBuiltInZoomControls(false);
        webView_child.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        webView_child.getSettings().setGeolocationEnabled(true);
        webView_child.addJavascriptInterface(new Object(){
            @JavascriptInterface
            public void skip1(){
                Intent intent=new Intent(CommonalityActivity.this,Commonality2Activity.class);
                intent.putExtra("Common2",1);
                startActivity(intent);
            }
            @JavascriptInterface
            public void skip2(){
                Intent intent=new Intent(CommonalityActivity.this,Commonality2Activity.class);
                intent.putExtra("Common2",2);
                startActivity(intent);
            }
            @JavascriptInterface
            public void skip3(){
                Intent intent=new Intent(CommonalityActivity.this,HdMainActivity.class);
             /*intent.putExtra("Common2",3);*/
                startActivity(intent);
            }
        },"android");
        int id=getIntent().getIntExtra("MianId",0);
        Toast.makeText(CommonalityActivity.this,"Activity标记ID"+id,Toast.LENGTH_LONG).show();
        /*通过跳转标记跳转到不同的页面*/
        if(id==6){
            getSupportActionBar().setTitle("上海青乾科技");
            webView_child.loadUrl("file:///android_asset/pagemain1.html");
        }
        webView_child.setWebViewClient(new WebViewClient(){
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
        webView_child.setWebChromeClient(new WebChromeClient(){
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

    }
    DoubleClickExitHelper mDoubleClickExit=new DoubleClickExitHelper(CommonalityActivity.this);
 @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView_child.canGoBack()){
            webView_child.goBack();
            mDoubleClickExit.onKeyDown(keyCode, event);
            return true;
        }else{
            System.exit(0);
     }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id=item.getItemId();
        if(id==android.R.id.home){
            onBackPressed();
        }else if(id==R.menu.menu_hdmian){

        }
        return super.onOptionsItemSelected(item);
    }
}
