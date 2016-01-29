<!-- Frame Vaisseau Page Home -->
<script type="x-tmpl-mustache" id="vaisseau-home">
    <div class="cols5">
        <div class="frame0 t-black c-white">
            <div class="frame-content">
                <h2 class="title1">{{nom_vaisseau}}</h2>

                <img src="{{vaisseau_image}}" alt="{{nom_vaisseau}}"/>
                <div class="icon icon-pv"></div>
                <div class="icon-content">{{vaisseau_pv}}</div>
                <div class="icon icon-defense"></div>
                <div class="icon-content">{{vaisseau_defense}}</div>
                <div class="icon icon-attaque"></div>
                <div class="icon-content">{{vaisseau_attaque}}</div>
                <div class="icon icon-xp"></div>
                <div class="icon-content">{{vaisseau_xp}}</div>
            </div>
        </div>
    </div>
</script>

<!-- Frame Vaisseau Page Home -->
<script type="x-tmpl-mustache" id="vaisseau-selection-mission">
    <div class="cols12">
        <div class="frame0 t-black c-white">
            <div class="frame-content">
                    <img src="{{vaisseau_image}}" alt="{{nom_vaisseau}}" class="ship-img cols2"/>
                    <h2 class="cols10">{{nom_vaisseau}}</h2>
                    <div class="icon icon-pv"></div>
                    <div class="icon-content">{{vaisseau_pv}}</div>
                    <div class="icon icon-defense"></div>
                    <div class="icon-content">{{vaisseau_defense}}</div>
                    <div class="icon icon-attaque"></div>
                    <div class="icon-content">{{vaisseau_attaque}}</div>
                    <div class="icon icon-xp"></div>
                    <div class="icon-content">{{vaisseau_xp}}</div>
            </div>
        </div>
    </div>
</script>

<!-- Frame Missions dans la box de listing -->
<script type="x-tmpl-mustache" id="mission">
    <div class="row">
        <div class="icon3 left icon-rank{{mission_level}}"></div>
        <h2 class="title1 c-white" >{{mission_nom}}</h2>

        <div class="icon icon-energy"></div>
        <div class="icon-content" >{{mission_energy}}</div>
        <div class="icon icon-coin"></div>
        <div class="icon-content">{{mission_or}}</div>
        <div class="icon icon-xp"></div>
        <div class="icon-content" >{{mission_xp}}</div>
        <a class="btn2 blue3 right js-to-mission" href="#" onClick="launch({{mission_launch}})">Lancer</a>
    </div>
</script>

<!-- Frame Lancement Mission -->
<script type="x-tmpl-mustache" id="mission_lancement">
    <div class="fullframe">
        <div class="frame1 white cols6 js-center frame-mission">
            <div class="frame-content js-frame-m">
                <br>
                <div class="icon3 left icon-rank{{mission_level}}"></div>

                <h2 class="title1 c-white">{{mission_nom}}</h2>
                <div class="left padd-10">
                    <img src="{{mission_image}}" width="400px" />
                </div>

                <div class="cols5 rigth c-white padd-10">
                    <div class="line c-white  text-mission">
                        {{mission_desc}}
                    </div>

                    <div class="row">
                        <div class="icon icon-energy"></div>
                        <div class="icon-content" >{{mission_energy}}</div>
                        <div class="icon icon-coin"></div>
                        <div class="icon-content">{{mission_or}}</div>
                        <div class="icon icon-xp"></div>
                        <div class="icon-content" >{{mission_xp}}</div>
                    </div>
                    <a href="#" class="btn2 blue3 right padd-10" onClick="launch_mission_click({{mission_bouton}})">Lancer</a>
                </div>

            </div>
        </div>
     </div>
</script>