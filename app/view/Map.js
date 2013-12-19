Ext.define('DinoKale.view.Map', {
    extend: 'Ext.Panel',
    xtype : 'map',

    config: {
        layout: 'vbox',

        items: [
            {
                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to DinoKale'
                },

                html: [
                    "This will be the map panel"
                ].join("")

            },
        ]
    }
});
});



