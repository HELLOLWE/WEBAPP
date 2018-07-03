package com.espoa_web.qq.com.esp_oawebapp;

import android.content.Context;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationProvider;
import android.net.ConnectivityManager;
import android.provider.Settings;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
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

import java.util.Timer;
import java.util.TimerTask;

public class MainActivity extends AppCompatActivity implements LocationListener{
    private static final String TAG ="----MainActivity" ;
    WebView webView;
    ActionBar actionBar;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        actionBar=getSupportActionBar();
        webView=(WebView)findViewById(R.id.webview);
        String dir = this.getApplicationContext().getDir("database", Context.MODE_PRIVATE).getPath();
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setBuiltInZoomControls(false);
        // 这句解决本地跨域问题，如果你的 PDF 文件在站点里，是不需要的，但是，我们一般情况是加载站点外部 PDF 文件
        webView.getSettings().setAllowFileAccessFromFileURLs(true);
        webView.getSettings().setRenderPriority(WebSettings.RenderPriority.HIGH);
       /* webView.getSettings().setBlockNetworkImage(true);*//*停止页面上所有的图片加载。。。*/
        webView.getSettings().setUseWideViewPort(true);
        webView.setBackgroundColor(0x00000000);
        webView.setHorizontalScrollBarEnabled(false);
        webView.getSettings().setDefaultFontSize(16);
        webView.addJavascriptInterface(new Object(){
            @JavascriptInterface
            public void settingGPS(){
                // 转到手机设置界面，用户设置GPS
                Intent intent=new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
                startActivity(intent); //设置完成后返回到原来的界面
            }
            @JavascriptInterface
            public void finishActivity(){
                finish();
            }
            @JavascriptInterface
            public void testNetwork(){
                if(isOpenNetwork()==true){
                    Toast.makeText(MainActivity.this, "网络连接正常",Toast.LENGTH_SHORT).show();
                }else{
                    Toast.makeText(MainActivity.this, "网络未连接，请连接网络", Toast.LENGTH_LONG).show();
                }
            }
            @JavascriptInterface
            public void skip4(){
                Intent intent=new Intent(MainActivity.this,CommonalityActivity.class);
                intent.putExtra("MianId",6);
                startActivity(intent);
            }
        },"android");

        webView.getSettings().setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
        webView.getSettings().setGeolocationEnabled(true);
        webView.loadUrl("file:///android_asset/login.html");
        //设置web界面在本地打开。
        webView.setWebViewClient(new WebViewClient(){
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url){
                return super.shouldOverrideUrlLoading(view, url);
            }
            @Override
            public void onLoadResource(WebView view, String url) {
                // TODO Auto-generated method stub
                super.onLoadResource(view, url);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                CookieManager cookieManager = CookieManager.getInstance();
                String CookieStr = cookieManager.getCookie(url);
                Log.e("espmain", "Cookies = " + CookieStr);
                super.onPageFinished(view, url);
            }

        });
        webView.getSettings().setDomStorageEnabled(true);
        webView.setWebChromeClient(new WebChromeClient(){
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
// 检测网络连接状态是否可用 连接为true

    private boolean isOpenNetwork(){
        ConnectivityManager connManager=(ConnectivityManager) getSystemService(Context.CONNECTIVITY_SERVICE);
        if(connManager.getActiveNetworkInfo()!=null){
            return connManager.getActiveNetworkInfo().isAvailable();
        }
        return false;

    }
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {

        if ((keyCode == KeyEvent.KEYCODE_BACK) && webView.canGoBack()){
            webView.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        this.finish();
        System.gc();

    }

    @Override
    public void onLocationChanged(Location location) {

    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {
        switch(status){
            //GPS状态为可见时
            case LocationProvider.AVAILABLE:
                Log.i(TAG, "当前GPS状态为可见状态");
                break;
            //GPS状态为服务区外时
            case LocationProvider.OUT_OF_SERVICE:
                Log.i(TAG, "当前GPS状态为服务区外状态");
                break;
            //GPS状态为暂停服务时
            case LocationProvider.TEMPORARILY_UNAVAILABLE:
                Log.i(TAG, "当前GPS状态为暂停服务状态");
                break;
        }

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id=item.getItemId();
        if(id==android.R.id.home){
           exitBy2Click();
        }
        return super.onOptionsItemSelected(item);
    }

    private Boolean isExit = false;
    private void exitBy2Click() {
        Timer tExit = null;
        if (isExit == false) {
            isExit = true; // 准备退出
            Toast.makeText(MainActivity.this, "再按一次退出程序", Toast.LENGTH_SHORT).show();
            tExit = new Timer();
            tExit.schedule(new TimerTask() {
                @Override
                public void run() {
                    isExit = false; // 取消退出
                }
            }, 2000); // 如果2秒钟内没有按下返回键，则启动定时器取消掉刚才执行的任务

        } else {
            finish();
            System.exit( 0);
        }
    }
}
