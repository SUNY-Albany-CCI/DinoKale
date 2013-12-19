Ext.define('DinoKale.view.SearchBar', {
    extend: 'Ext.Panel',
    xtype : 'map',

    config: {
        layout: 'vbox',

        items: [
            {
                title: 'Welcome',
                iconCls: 'add',

                styleHtmlContent: true,
                scrollable: true,

                html: [
                    "This will be the map panel"
                ].join("")

            },
        ]
    }
});
});



