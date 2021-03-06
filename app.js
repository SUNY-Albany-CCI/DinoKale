//<debug>
Ext.Loader.setPath({
    'Ext.plugin': 'lib/plugin'
});
//</debug>


/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'DinoKale',

    requires: [
        'Ext.MessageBox',
        'Ext.Button',
        'Ext.SegmentedButton',
        'Ext.Panel',
        'Ext.Toolbar',
        'Ext.plugin.google.Traffic',
        'Ext.plugin.google.Tracker'
    ],

    views: [
        'Main'
    ],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        var position = new google.maps.LatLng(42.6525, -73.7572);  //nearby Albany

        var infowindow = new google.maps.InfoWindow({
            content: 'Albany NY'
        });

        //Tracking Marker Image
        var image = new google.maps.MarkerImage(
            'resources/images/pointRed.png',
            new google.maps.Size(32, 31),
            new google.maps.Point(0, 0),
            new google.maps.Point(16, 31)
        );

        //Tracking Marker Image
        var image2 = new google.maps.MarkerImage(
            'resources/images/pointBlue.png',
            new google.maps.Size(32, 31),
            new google.maps.Point(0, 0),
            new google.maps.Point(16, 31)
        );

        var shadow = new google.maps.MarkerImage(
            'resources/images/shadow.png',
            new google.maps.Size(64, 52),
            new google.maps.Point(0, 0),
            new google.maps.Point(-5, 42)
        );

        var trackingButton = Ext.create('Ext.Button', {
            iconCls: 'locate'
        });

        var trafficButton = Ext.create('Ext.Button', {
            iconCls: 'time'
        });

        var wicDataButton = Ext.create('Ext.Button', {
            iconCls: 'search'
        });

        var communityIndicatorsButton = Ext.create('Ext.Button', {
            iconCls: 'team'
        });

        var restaurantLocationsButton = Ext.create('Ext.Button', {
            iconCls: 'favorites'
        });

        var healthTipButton = Ext.create('Ext.Button', {
            iconCls: 'info'
        });

  // utility to sort an array by an integer key
  var sortByKey=function(array, key) {
  return array.sort(function(a, b) {
  var x = parseInt( a[key] ); var y = parseInt(b[key]);
  return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });}

  var processCountyData= function(jsonstr)
  {
    sortByKey(jsonstr, "county_code");

    var simple=[];

    for(var i = 0; i < jsonstr.length; i++) 
    {
      if( parseInt(jsonstr[i].county_code) <= 62) // delete index
      {
      //  simple.push(jsonstr);
        simple.push({county_code: jsonstr[i].county_code, 
          percentage_rate: jsonstr[i].percentage_rate, location: jsonstr[i].location});
      }
    }

    return simple;
  };

    
        var getNYHealthData = function(resourceId, displayFunction, processFunction) {

          var xmlHttp = new XMLHttpRequest();

          var clientSideUpdate = function() {

              if (xmlHttp.readyState === 4) {
                var result = {};
                if (xmlHttp.status===200) {
                  result.data = JSON.parse(xmlHttp.responseText);
                  }
                result.status = xmlHttp.status;
                if( processFunction ) {
                  result.data=processFunction(result.data);
                  }

                if( displayFunction ) {
                  displayFunction(result.data);
                  }
                }

            };

          var dataServerURL = 'http://54.225.78.7:8489';
          var dataURI = dataServerURL+'?resource='+resourceId;

          xmlHttp.onreadystatechange = clientSideUpdate;
          xmlHttp.open( "GET", dataURI, false );
          xmlHttp.send( null );

          };

        toolbar = Ext.create('Ext.Toolbar', {
            docked: 'top',
            ui: 'light',
            items: [
                {
                    iconCls: 'home',
                    handler: function() {
                        //disable tracking
                        var segmented = Ext.getCmp('segmented');
                        var pressedButtons = segmented.getPressedButtons();
                        var trafficIndex = pressedButtons.indexOf(trafficButton);
                        var newPressed = (trafficIndex != -1) ? [trafficButton] : [];
                        segmented.setPressedButtons(newPressed);
                        mapdemo.getMap().panTo(position);
                    }
                },
                {
                    id: 'segmented',
                    xtype: 'segmentedbutton',
                    allowMultiple: true,
                    listeners: {
                        toggle: function(buttons, button, active) {
                            if (button == trafficButton) {
                                mapdemo.getPlugins()[1].setHidden(!active);
                            }
                            else if (button == trackingButton) {
                                var tracker = mapdemo.getPlugins()[0];
                                var marker = tracker.getMarker();
                                marker.setVisible(active);
                                tracker.setTrackSuspended(!active);
                            }
                            else if (button == wicDataButton) {
                              var resourceId = 'g4i5-r6zx'; // WIC programs

                              var renderLocations = function(datasetArray) {

                console.log('downloaded data: ');
                console.log(datasetArray);

                                datasetArray.forEach( function(entry) {
                  

                                  var coord = entry.location_1;

                                  if( coord.latitude && coord.longitude ) {
					  var position = new google.maps.LatLng(coord.latitude,coord.longitude);

					  var marker = new google.maps.Marker({
					     position: position,
					     title: entry.site_name,
					     shadow: shadow,
					     icon: image
					     });

					  marker.setMap( mapdemo.getMap() );
					}

                                  });
                                };

                              getNYHealthData(resourceId,renderLocations);
                            }
                            else if (button == communityIndicatorsButton) {
                              var resourceId = 'u98s-c3hg';//'tchg-ruva'; // Community Health indicators

                              var renderLocations = function(datasetArray) {

                                var dataPoints = [];

                                console.log('length is: '+datasetArray.length);

                                datasetArray.forEach( function(entry) {

                
                                  if (entry.county_code)
                                  {
                                  console.log('county code is'+entry.county_code);
                                  }

                                  if( entry.location ) {
                                    var coord = entry.location;
                                    var weight = entry.percentage_rate;

                                    console.log(coord);
                                    console.log(weight);

                                    console.log('location is: '+coord);

                                    if( coord.latitude && coord.longitude ) {
                                      var position = new google.maps.LatLng(coord.latitude,coord.longitude);
                                      dataPoints.push(position);

                                      var percentOptions = {
                                        strokeColor: '#FF0000',
                                        strokeOpacity: 0.8,
                                        strokeWeight: 2,
                                        fillColor: '#FF0000',
                                        fillOpacity: 0.10,
                                        map: mapdemo.getMap(),
                                        center: position,
                                        radius: weight * 100
                                        };

                                        cityCircle = new google.maps.Circle(percentOptions);
                                      }
                                    }

                                  });

                                var pointArray = new google.maps.MVCArray(dataPoints);

                                var heatmap = new google.maps.visualization.HeatmapLayer({
                                    data: pointArray
                                  });

                                  heatmap.setMap( mapdemo.getMap() );

                                };

                              getNYHealthData(resourceId,renderLocations, processCountyData);
                            }
                            else if (button == restaurantLocationsButton) {
                              var resourceId = 'qd6f-nmcs'; // Restaurant inspection data

                              var renderLocations = function(datasetArray) {

                                var dataPoints = [];

                                datasetArray.forEach( function(entry) {

                                  // The coordinates are in a "location1" field.
                                  var coord = entry.location1;
                                  var position = new google.maps.LatLng(coord.latitude,coord.longitude);

                                  var marker = new google.maps.Marker({
                                     position: position,
                                     title: entry.site_name,
                                     shadow: shadow,
                                     icon: image2
                                     });

                                  marker.setMap( mapdemo.getMap() );

                                  });

                                };

                              getNYHealthData(resourceId,renderLocations);
                            }
                            else if (button == healthTipButton) {
                              var resourceId = 'bb49-98mq'; // Health Tips

                              var displayHealthTip = function(tipsArray) {
                                var tipMin = 0;
                                var tipMax = tipsArray.length;
                                var tipNumber = Math.floor(Math.random() * (tipMax - tipMin + 1)) + tipMin;
                                var tipText = tipsArray[tipNumber].tip;
                                alert(tipText);
                                }

                              getNYHealthData(resourceId,displayHealthTip);
                            }
                        }
                    },
                    items: [
                        trackingButton, trafficButton, wicDataButton, communityIndicatorsButton, restaurantLocationsButton, healthTipButton
                    ]
                }
            ]
        });


        var mapdemo = Ext.create('Ext.Map', {
            mapOptions : {
                center : new google.maps.LatLng(42.6525, -73.7572),  //nearby Albany
                zoom : 12,
                mapTypeId : google.maps.MapTypeId.ROADMAP,
                navigationControl: true,
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.DEFAULT
                }
            },

            plugins : [
                new Ext.plugin.google.Tracker({
                    trackSuspended: true,   //suspend tracking initially
                    allowHighAccuracy: false,
                    marker: new google.maps.Marker({
                        position: position,
                        title: 'My Current Location',
                        shadow: shadow,
                        icon: image
                    })
                }),
                new Ext.plugin.google.Traffic()
            ],
            mapListeners: {
                dragstart: function() {
                    var segmented = Ext.getCmp('segmented'),
                        pressedButtons = segmented.getPressedButtons().slice(),
                        trackingIndex = pressedButtons.indexOf(trackingButton);
                    if (trackingIndex != -1) {
                        pressedButtons.splice(trackingIndex, 1);
                        segmented.setPressedButtons(pressedButtons);
                    }
                }
            },

            listeners: {
                maprender: function(comp, map) {
                    var marker = new google.maps.Marker({
                        position: position,
                        title : 'Albany NY',
                        map: map
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map, marker);
                    });

                    setTimeout(function() {
                        map.panTo(position);
                    }, 1000);
                }

            }
        });

        mapdemo.getPlugins()[1].setHidden(1); // hide traffic initially

        // Initialize the main view
        // Ext.Viewport.add(Ext.create('DinoKale.view.Main'));

        Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: 'fit',
            items: [toolbar, mapdemo]
        });
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
