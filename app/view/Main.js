Ext.define('DinoKale.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.Video'
    ],
    config: {
        tabBarPosition: 'bottom',

        items: [
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2'
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            },
            {
                title: 'Get Started',
                iconCls: 'action',

                items: [
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        title: 'Getting Started'
                    },
                    {
                        xtype: 'video',
                        url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
                        posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg'
                    }
                ]
            },
            {
                title: 'Get Data',
                iconCls: 'search',

                styleHtmlContent: true,
                scrollable: true,

                items: [
                  {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Getting Data for NY Data'
                  },
                  {
                    xtype: 'button',
                    id: 'databutton',
                    text: 'Get Data',
                    handler : function() {

                      var xmlHttp = new XMLHttpRequest();

                      var clientSideUpdate = function() {

                          if (xmlHttp.readyState === 4) {
                            var result = {};
                            if (xmlHttp.status===200) {
//                              result.data = JSON.parse(xmlHttp.responseText);
                              }
                            result.status = xmlHttp.status;
                            alert(xmlHttp.responseText);
                            }

                        };

                      var dataServerURL = 'http://54.225.78.7:8489';
                      var resourceId = 'g4i5-r6zx'; // WIC programs
                      var dataURI = dataServerURL+'?resource='+resourceId;

                      xmlHttp.onreadystatechange = clientSideUpdate;
                      xmlHttp.open( "GET", dataURI, false );
                      xmlHttp.send( null );
                      }
                  }
                ]
            }
        ]
    }
});
