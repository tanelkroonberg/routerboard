<div class="wrap-spot">
	<div class="container_16">
		<div class="grid_16 spotlight">
			<div id="slider" class="grid_16 alpha">
				<div class="anythingSlider anythingSlider-default activeSlider"
				     style="width: 940px; height: 280px; display: block; overflow: hidden;">
					<div class="anythingWindow">
						<ul id="prduslider" class="anythingBase" style="width: 5640px; left: -4698.351643847267px;">
							<li class="cloned panel" style="width: 940px; height: 280px;">
								<div class="img"><img src="<?= ASSETS_URL ?>img/mtlogo-spot.png" alt="" width="270"
								                      height="259"></div>
								<div class="txt"><h1>RouterBOARD</h1>

									<p>RouterBOARD is the hardware platform made by MikroTik. Our routers are powered by the
										powerful <a href="http://www.mikrotik.com/software.html" disabled="disabled">RouterOS
											software</a>. RouterBOARD routers are used by ISPs, integrators, system builders and
										large corporations around the world.</p>

									<p>Browse through our products on this webpage</p>          <span class="readmore"><a
											href="http://routerboard.com/about" disabled="disabled">Learn more about MikroTik</a></span>
								</div>
							</li>
							<li class="panel" style="width: 940px; height: 280px;">
								<div class="img"><img src="<?=ASSETS_URL?>img/spot_ccr103612G.png" alt=""
								                      width="270" height="270"></div>
								<div class="txt"><h1>CCR1036</h1>

									<p>CCR1036-12G-4S is an carrier grade router with a cutting edge 36 core Tilera CPU! Over 20
										times faster than our previous top model.</p>

									<p>The Cloud Core supports throughput of up to 24 million packets per second, or up to 16
										gigabits - full wire speed.</p>          <span class="readmore"><a
											href="http://routerboard.com/CCR1036-12G-4S">Read More</a></span></div>
							</li>
							<li class="panel" style="width: 940px; height: 280px;">
								<div class="img"><img src="<?=ASSETS_URL?>img/sxt-spot.png" alt="" width="270"
								                      height="310"></div>
								<div class="txt"><h1>RouterBOARD SXT Lite5</h1>

									<p>Our best price/performance 5Ghz CPE. The SXT Lite5 (product code RBSXT5nDr2), 5Ghz 16dBi
										integrated antenna with 600MHz CPU, 64MB RAM and RouterOS L3 installed.</p>

									<p>SXT Lite5 is a low cost, high transmit power 5GHz outdoor wireless device. It can be used
										for point to point links or as a CPE for point to multipoint installations.</p>
									<span class="readmore"><a href="http://routerboard.com/RBSXT-5nDr2">Read More</a></span></div>
							</li>
							<li class="panel" style="width: 940px; height: 280px;">
								<div class="img"><img src="<?=ASSETS_URL?>img/spot_RB2011UAS2HnDIN.png" alt=""
								                      width="270" height="270"></div>
								<div class="txt"><h1>RouterBOARD 2011</h1>

									<p>The RB2011 is a low cost multi port device series. Designed for indoor use, and available
										in many different cases, with a multitude of options.</p>

									<p>Dynamic routing, hotspot, firewall, MPLS, VPN, advanced quality of service, load balancing
										and bonding, real-time configuration and monitoring - just a few of the vast number of
										features supported by RouterOS.</p>          <span class="readmore"><a
											href="http://routerboard.com/RB2011UAS-2HnD-IN">Read More</a></span></div>
							</li>
							<li class="panel activePage" style="width: 940px; height: 280px;">
								<div class="img"><img src="<?=ASSETS_URL?>img/mtlogo-spot.png" alt="" width="270"
								                      height="259"></div>
								<div class="txt"><h1>RouterBOARD</h1>

									<p>RouterBOARD is the hardware platform made by MikroTik. Our routers are powered by the
										powerful <a href="http://www.mikrotik.com/software.html">RouterOS software</a>.
										RouterBOARD routers are used by ISPs, integrators, system builders and large corporations
										around the world.</p>

									<p>Browse through our products on this webpage</p>          <span class="readmore"><a
											href="http://routerboard.com/about">Learn more about MikroTik</a></span></div>
							</li>
							<li class="cloned panel" style="width: 940px; height: 280px;">
								<div class="img"><img src="<?=ASSETS_URL?>img/spot_ccr103612G.png" alt=""
								                      width="270" height="270"></div>
								<div class="txt"><h1>CCR1036</h1>

									<p>CCR1036-12G-4S is an carrier grade router with a cutting edge 36 core Tilera CPU! Over 20
										times faster than our previous top model.</p>

									<p>The Cloud Core supports throughput of up to 24 million packets per second, or up to 16
										gigabits - full wire speed.</p>          <span class="readmore"><a
											href="http://routerboard.com/CCR1036-12G-4S" disabled="disabled">Read More</a></span>
								</div>
							</li>
						</ul>
					</div>
					<div class="anythingControls" style="">
						<ul class="thumbNav" style=""></ul>
					</div>
					<span class="arrow back" style=""><a href="<?= BASE_URL ?>products#"><span>«</span></a></span><span
						class="arrow forward" style=""><a href="<?= BASE_URL ?>products#"><span>»</span></a></span></div>
			</div>
		</div>
	</div>
</div>
<div class="wrap-body">
<div class="container_16">
<div class="grid_16">
<nav class="grid_5 alpha"><!-- left menu here -->
<div class="column" id="left"><!-- filtru miskaste -->
<form action="http://routerboard.com/products#" method="get" id="hidden_form"><input type="hidden" name="group_id"
                                                                                     id="group_id" value=""></form>
<h2>Product group</h2>

<p><em style="color: #888; font-size: 0.9em">Filter the products by group, and then by their specifications</em></p>

<div>
<form id="groupSelector" action="http://routerboard.com/products#">
<fieldset style="border:none">
	<? if (!empty($groups)): foreach ($groups as $group):?>
	<div class="filter_item"><input name="group_id" id="group_id_<?=$group['group_id']?>" type="radio" value="<?=$group['group_id']?>"

	                                class="ui-helper-hidden-accessible"><span onclick="setProductGroup
			('<?=$group['group_id']?>')" class="ui-radio"></span><label
			style="display:none;" for="group_id_<?=$group['group_id']?>"><?=$group['group_id']?></label><?=$group['group_name']?>
	</div>
	<? endforeach; endif?>
</fieldset>
<input type="hidden" value="512" id="maxRAM" name="maxRAM"> <input type="hidden" value="5" id="miniPCI"
                                                                   name="miniPCI"> <input type="hidden"
                                                                                          value="1333" id="maxCPU"
                                                                                          name="maxCPU"> <input
	type="hidden" value="6" id="maxLIC" name="maxLIC"> <input type="hidden" value="13" id="maxLAN" name="maxLAN">
<input type="hidden" value="4" id="maxSFP" name="maxSFP"> <input type="hidden" value="32" id="outputPower"
                                                                 name="outputPower">
<!--<input type="hidden" value="1333" id="1maxCPU" name="1maxCPU"/><input type="hidden" value="512" id="1maxRAM" name="1maxRAM"/><input type="hidden" value="6" id="1maxLIC" name="1maxLIC"/><input type="hidden" value="13" id="1maxLAN" name="1maxLAN"/><input type="hidden" value="5" id="1miniPCI" name="1miniPCI"/><input type="hidden" value="7" id="1outputPower" name="1outputPower"/>-->
<div class="slider_container"><label for="amount_price">Price:</label> <input type="text" id="amount_price"
                                                                              class="filter-label"
                                                                              disabled="disabled">

	<div class="filter-slider">
		<div id="slider-range_price"
		     class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
			<div class="ui-slider-range ui-widget-header" style="left: 0%; width: 100%;"></div>
			<a href="http://routerboard.com/products#" class="ui-slider-handle ui-state-default ui-corner-all"
			   style="left: 0%;"></a><a href="http://routerboard.com/products#"
			                            class="ui-slider-handle ui-state-default ui-corner-all"
			                            style="left: 100%;"></a></div>
	</div>
</div>
<div id="routerBoardClass" style="display:none;" class="filterClass">
	<div class="slider_container"><label for="amount_CPU_speed">CPU:</label> <input type="text"
	                                                                                id="amount_CPU_speed"
	                                                                                class="filter-label"
	                                                                                disabled="disabled">

		<div class="filter-slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
		     id="slider-range_CPU_speed">
			<div class="ui-slider-range ui-widget-header" style="left: 0%; width: 100%;"></div>
			<a href="http://routerboard.com/products#" class="ui-slider-handle ui-state-default ui-corner-all"
			   style="left: 0%;"></a><a href="http://routerboard.com/products#"
			                            class="ui-slider-handle ui-state-default ui-corner-all"
			                            style="left: 100%;"></a></div>
	</div>
	<div class="slider_container"><label for="amount_RAM">RAM:</label><input type="text" id="amount_RAM"
	                                                                         class="filter-label"
	                                                                         disabled="disabled">

		<div class="filter-slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
		     id="slider-range_RAM">
			<div class="ui-slider-range ui-widget-header" style="left: 0%; width: 100%;"></div>
			<a href="http://routerboard.com/products#" class="ui-slider-handle ui-state-default ui-corner-all"
			   style="left: 0%;"></a><a href="http://routerboard.com/products#"
			                            class="ui-slider-handle ui-state-default ui-corner-all"
			                            style="left: 100%;"></a></div>
	</div>
	<div class="slider_container"><label for="amount_MiniPCI">MiniPCI:</label><input type="text"
	                                                                                 id="amount_MiniPCI"
	                                                                                 class="filter-label"
	                                                                                 disabled="disabled">

		<div class="filter-slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
		     id="slider-range_MiniPCI">
			<div class="ui-slider-range ui-widget-header" style="left: 0%; width: 100%;"></div>
			<a href="http://routerboard.com/products#" class="ui-slider-handle ui-state-default ui-corner-all"
			   style="left: 0%;"></a><a href="http://routerboard.com/products#"
			                            class="ui-slider-handle ui-state-default ui-corner-all"
			                            style="left: 100%;"></a></div>
	</div>
	<div class="slider_container"><label for="amount_LAN_ports">LAN ports:</label><input type="text"
	                                                                                     id="amount_LAN_ports"
	                                                                                     class="filter-label"
	                                                                                     disabled="disabled">

		<div class="filter-slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
		     id="slider-range_LAN_ports">
			<div class="ui-slider-range ui-widget-header" style="left: 0%; width: 100%;"></div>
			<a href="http://routerboard.com/products#" class="ui-slider-handle ui-state-default ui-corner-all"
			   style="left: 0%;"></a><a href="http://routerboard.com/products#"
			                            class="ui-slider-handle ui-state-default ui-corner-all"
			                            style="left: 100%;"></a></div>
	</div>
	<div class="slider_container"><label for="amount_RouterOS_License">License level:</label><input type="text"
	                                                                                                id="amount_RouterOS_License"
	                                                                                                class="filter-label"
	                                                                                                disabled="disabled">

		<div class="filter-slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
		     id="slider-range_RouterOS_License">
			<div class="ui-slider-range ui-widget-header" style="left: 0%; width: 100%;"></div>
			<a href="http://routerboard.com/products#" class="ui-slider-handle ui-state-default ui-corner-all"
			   style="left: 0%;"></a><a href="http://routerboard.com/products#"
			                            class="ui-slider-handle ui-state-default ui-corner-all"
			                            style="left: 100%;"></a></div>
	</div>
	<div class="slider_container"><label for="amount_SFP_ports">SFP ports:</label><input type="text"
	                                                                                     id="amount_SFP_ports"
	                                                                                     class="filter-label"
	                                                                                     disabled="disabled">

		<div class="filter-slider ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all"
		     id="slider-range_SFP_ports">
			<div class="ui-slider-range ui-widget-header" style="left: 0%; width: 100%;"></div>
			<a href="http://routerboard.com/products#" class="ui-slider-handle ui-state-default ui-corner-all"
			   style="left: 0%;"></a><a href="http://routerboard.com/products#"
			                            class="ui-slider-handle ui-state-default ui-corner-all"
			                            style="left: 100%;"></a></div>
	</div>
	<br>

	<div class="filter_item"><input type="checkbox" name="checkbox_USB" id="checkbox_USB" onclick="applyFilters()"
	                                class="ui-helper-hidden-accessible"><span class="ui-checkbox"></span><label
			style="display: none" for="checkbox_USB">USB</label>&nbsp; USB
	</div>
	<div class="filter_item"><input type="checkbox" id="checkbox_Memory_Cards" onclick="applyFilters()"
	                                class="ui-helper-hidden-accessible"><span class="ui-checkbox"></span><label
			style="display: none" for="checkbox_Memory_Cards">Memory_Cards</label>&nbsp; Memory cards
	</div>
	<div class="filter_item"><input type="checkbox" id="checkbox_Integrated_Wireless" onclick="applyFilters()"
	                                class="ui-helper-hidden-accessible"><span class="ui-checkbox"></span><label
			style="display: none" for="checkbox_Integrated_Wireless">Integrated_Wireless</label>&nbsp; Integrated
		wireless
	</div>
	<div class="filter_item"><input type="checkbox" id="checkbox_Gigabit" onclick="applyFilters()"
	                                class="ui-helper-hidden-accessible"><span class="ui-checkbox"></span><label
			style="display: none" for="checkbox_Gigabit">Gigabit</label>&nbsp; Gigabit
	</div>
	<div class="filter_item"><input type="checkbox" id="checkbox_Voltage_Monitor" onclick="applyFilters()"
	                                class="ui-helper-hidden-accessible"><span class="ui-checkbox"></span><label
			style="display: none" for="checkbox_Voltage_Monitor">Voltage monitor</label>&nbsp; Voltage monitor
	</div>
	<div class="filter_item"><input type="checkbox" id="checkbox_Temperature_sensor" onclick="applyFilters()"
	                                class="ui-helper-hidden-accessible"><span class="ui-checkbox"></span><label
			style="display: none" for="checkbox_Temperature_sensor">Temperature sensor</label>&nbsp; Temperature
		sensor
	</div>
	<div style="padding-top:25px;"><p><span>Wireless standards:</span></p>
		<fieldset style="border: none;">
			<div class="filter_item"><input type="checkbox" id="checkbox_802.11a" onclick="applyFilters()"
			                                class="ui-helper-hidden-accessible"><span
					class="ui-checkbox"></span><label style="display:none;" for="checkbox_802.11a">a</label>&nbsp;
				802.11a
			</div>
			<div class="filter_item"><input type="checkbox" id="checkbox_802.11b" onclick="applyFilters()"
			                                class="ui-helper-hidden-accessible"><span
					class="ui-checkbox"></span><label style="display:none;" for="checkbox_802.11b">b</label>&nbsp;
				802.11b
			</div>
			<div class="filter_item"><input type="checkbox" id="checkbox_802.11g" onclick="applyFilters()"
			                                class="ui-helper-hidden-accessible"><span
					class="ui-checkbox"></span><label style="display:none;" for="checkbox_802.11g">g</label>&nbsp;
				802.11g
			</div>
			<div class="filter_item"><input type="checkbox" id="checkbox_802.11n" onclick="applyFilters()"
			                                class="ui-helper-hidden-accessible"><span
					class="ui-checkbox"></span><label style="display:none;" for="checkbox_802.11n">n</label>&nbsp;
				802.11n
			</div>
		</fieldset>
	</div>
</div>
<div id="enclosuresClass" style="display:none;" class="filterClass"><p><span>Color:</span></p>
	<fieldset style="border: none;">
		<div class="filter_item"><input type="radio" name="color" id="radio_all_Color" checked="checked"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio ui-radio-state-checked"></span> <label style="display:none;" for="radio_all_Color"
		                                                               class=" ui-radio-state-checked">all</label>
			&nbsp; All colors
		</div>
		<div class="filter_item"><input type="radio" name="color" id="radio_Color_White" onclick="applyFilters()"
		                                class="ui-helper-hidden-accessible"><span class="ui-radio"></span> <label
				style="display:none;" for="radio_Color_White">White</label> &nbsp; White
		</div>
		<div class="filter_item"><input type="radio" name="color" id="radio_Color_Black" onclick="applyFilters()"
		                                class="ui-helper-hidden-accessible"><span class="ui-radio"></span> <label
				style="display:none;" for="radio_Color_Black">Black</label> &nbsp; Black
		</div>
		<div class="filter_item"><input type="radio" name="color" id="radio_Color_Aluminium"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio"></span> <label style="display:none;"
		                                        for="radio_Color_Aluminium">Aluminium</label> &nbsp; Aluminium
		</div>
	</fieldset>
	<p><span>Material:</span></p>
	<fieldset style="border: none;">
		<div class="filter_item"><input type="radio" name="material" id="radio_all_Material" checked="checked"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio ui-radio-state-checked"></span> <label style="display:none;"
		                                                               for="radio_all_Material"
		                                                               class=" ui-radio-state-checked">all</label>
			&nbsp; All materials
		</div>
		<div class="filter_item"><input type="radio" name="material" id="radio_Material_Plastic"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio"></span> <label style="display:none;" for="radio_Material_Plastic">Plastic</label>
			&nbsp; Plastic
		</div>
		<div class="filter_item"><input type="radio" name="material" id="radio_Material_Metal"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio"></span> <label style="display:none;" for="radio_Material_Metal">Metal</label>
			&nbsp; Metal
		</div>
		<div class="filter_item"><input type="radio" name="material" id="radio_Material_Aluminium"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio"></span> <label style="display:none;"
		                                        for="radio_Material_Aluminium">Aluminium</label> &nbsp; Aluminium
		</div>
	</fieldset>
	<p><span>Purpose:</span></p>
	<fieldset style="border: none;">
		<div class="filter_item"><input type="radio" name="purpose" id="radio_all_Purpose" checked="checked"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio ui-radio-state-checked"></span> <label style="display:none;"
		                                                               for="radio_all_Purpose"
		                                                               class=" ui-radio-state-checked">all</label>
			&nbsp; All purposes
		</div>
		<div class="filter_item"><input type="radio" name="purpose" id="radio_Purpose_Indoor"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio"></span> <label style="display:none;" for="radio_Purpose_Indoor">Indoor</label>
			&nbsp; Indoor
		</div>
		<div class="filter_item"><input type="radio" name="purpose" id="radio_Purpose_Outdoor"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio"></span> <label style="display:none;" for="radio_Purpose_Outdoor">Outdoor</label>
			&nbsp; Outdoor
		</div>
	</fieldset>
</div>
<div id="interfacesClass" style="display:none;" class="filterClass"><p><span>Bands:</span></p>
	<fieldset style="border: none;">
		<div class="filter_item"><input type="checkbox" id="checkbox_2GHz" onclick="applyFilters()"
		                                class="ui-helper-hidden-accessible"><span
				class="ui-checkbox"></span><label style="display:none;" for="checkbox_2GHz">2GHz</label>&nbsp;
			2GHz
		</div>
		<div class="filter_item"><input type="checkbox" id="checkbox_5GHz" onclick="applyFilters()"
		                                class="ui-helper-hidden-accessible"><span
				class="ui-checkbox"></span><label style="display:none;" for="checkbox_5GHz">5GHz</label>&nbsp;
			5GHz
		</div>
	</fieldset>
	<p><span>Wireless standards:</span></p>
	<fieldset style="border: none;">
		<div class="filter_item"><input type="checkbox" id="checkbox_802.11a" onclick="applyFilters()"
		                                class="ui-helper-hidden-accessible"><span
				class="ui-checkbox"></span><label style="display:none;" for="checkbox_802.11a">a</label>&nbsp;
			802.11a
		</div>
		<div class="filter_item"><input type="checkbox" id="checkbox_802.11b" onclick="applyFilters()"
		                                class="ui-helper-hidden-accessible"><span
				class="ui-checkbox"></span><label style="display:none;" for="checkbox_802.11b">b</label>&nbsp;
			802.11b
		</div>
		<div class="filter_item"><input type="checkbox" id="checkbox_802.11g" onclick="applyFilters()"
		                                class="ui-helper-hidden-accessible"><span
				class="ui-checkbox"></span><label style="display:none;" for="checkbox_802.11g">g</label>&nbsp;
			802.11g
		</div>
		<div class="filter_item"><input type="checkbox" id="checkbox_802.11n" onclick="applyFilters()"
		                                class="ui-helper-hidden-accessible"><span
				class="ui-checkbox"></span><label style="display:none;" for="checkbox_802.11n">n</label>&nbsp;
			802.11n
		</div>
	</fieldset>
	<div class="slider_container"><label for="amount_Output_power">Output power:</label> <input type="text"
	                                                                                            id="amount_Output_power"
	                                                                                            class="filter-label"
	                                                                                            disabled="disabled">

		<div class="filter-slider">
			<div id="slider-range_Output_power"
			     class="ui-slider ui-slider-horizontal ui-widget ui-widget-content ui-corner-all">
				<div class="ui-slider-range ui-widget-header" style="left: 0%; width: 100%;"></div>
				<a href="http://routerboard.com/products#" class="ui-slider-handle ui-state-default ui-corner-all"
				   style="left: 0%;"></a><a href="http://routerboard.com/products#"
				                            class="ui-slider-handle ui-state-default ui-corner-all"
				                            style="left: 100%;"></a></div>
		</div>
	</div>
	<p><span>Connector:</span></p>
	<fieldset style="border: none;">
		<div class="filter_item"><input type="radio" name="connector" id="radio_all_Connector" checked="checked"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio ui-radio-state-checked"></span> <label style="display:none;"
		                                                               for="radio_all_Connector"
		                                                               class=" ui-radio-state-checked">all</label>
			&nbsp; All connectors
		</div>
		<div class="filter_item"><input type="radio" name="connector" id="radio_Connector_uFl"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio"></span> &nbsp; uFl
		</div>
		<div class="filter_item"><input type="radio" name="connector" id="radio_Connector_MMCX"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio"></span> <label style="display:none;" for="radio_Connector_MMCX">MMCX</label>
			&nbsp; MMCX
		</div>
	</fieldset>
	<span>Format:</span>
	<fieldset style="border: none;">
		<div class="filter_item"><input type="radio" name="format" id="radio_all_Format" checked="checked"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio ui-radio-state-checked"></span> <label style="display:none;"
		                                                               for="radio_all_Format"
		                                                               class=" ui-radio-state-checked">all</label>
			&nbsp; All formats
		</div>
		<div class="filter_item"><input type="radio" name="format" id="radio_Format_PCI" onclick="applyFilters()"
		                                class="ui-helper-hidden-accessible"><span class="ui-radio"></span> <label
				style="display:none;" for="radio_Format_PCI">PCI</label> &nbsp; PCI
		</div>
		<div class="filter_item"><input type="radio" name="format" id="radio_Format_PCIe" onclick="applyFilters()"
		                                class="ui-helper-hidden-accessible"><span class="ui-radio"></span> <label
				style="display:none;" for="radio_Format_PCIe">PCIe</label> &nbsp; PCIe
		</div>
		<div class="filter_item"><input type="radio" name="format" id="radio_Format_miniPCI"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio"></span> <label style="display:none;" for="radio_Format_miniPCI">miniPCI</label>
			&nbsp; miniPCI
		</div>
		<div class="filter_item"><input type="radio" name="format" id="radio_Format_miniPCI-e"
		                                onclick="applyFilters()" class="ui-helper-hidden-accessible"><span
				class="ui-radio"></span> <label style="display:none;"
		                                        for="radio_Format_miniPCI-e">miniPCI-e</label> &nbsp; miniPCI-e
		</div>
	</fieldset>
</div>
</form>
</div>
</div>
<!-- EOF filtru miskaste --> <!-- statisks failu bokss --> <br>

<div class="filesbox"><span>Useful links</span>
	<ul>
		<li>All <a href="http://download2.mikrotik.com/2013-Q2.pdf">product brochure</a></li>
		<li>What is <a href="http://www.mikrotik.com/pdf/what_is_routeros.pdf">RouterOS</a>?</li>
		<li>Benchmarks: see product page</li>
	</ul>
</div>
<!-- comparison box --> <br>

<div class="filesbox" id="compare_box" style="display:none;">
	<div id="compare_error"></div>
	<div class="compare_block">
		<div class="compare_img"></div>
	</div>
	<div class="compare_block">
		<div class="compare_img"></div>
	</div>
	<div class="compare_block">
		<div class="compare_img"></div>
	</div>
	<a style="clear: both; display: block;" href="http://routerboard.com/compare" onclick="return checkCompare();">Compare
		selected</a></div>
</nav>
<div class="grid_11 omega" id="product_list"><!-- product list here -->
	<? if (!empty($products)): foreach ($products as $product):?>
<div class="product_box product_title group_class_<?=$product['group_id']?>" id="box_<?=$product['product_id']?>"><h3><a
			href="<?=BASE_URL?>view/<?=$product['product_id']?>"
                                                                          id="pname_<?=$product['product_id']?>"><?=$product['name']?> </a></h3><a
		class="boxlink" href="<?=BASE_URL?>view/<?=$product['product_id']?>">
		<div class="productBoxImg" id="pbox_img_<?=$product['product_id']?>"
		     style="background:url(<?=ASSETS_URL?>img/<?=$product['url']?>) no-repeat;
			     background-position:<?=$product['position']?>px 0px"></div>
		<div class="product_box_info">
			<ul>
				<li><?=$product['info']?>
				</li>
			</ul>
		</div>
		<span title="recommended price at distributors" class="price_label">$<?=$product['price']?></span></a><img
		class="compare_icon"
                                                                                                   src="<?=ASSETS_URL?>img/balance-plus.png"
                                                                                                   id="comp_balance_ico_<?=$product['product_id']?>"
                                                                                                   onclick="setCompareProduct(<?=$product['product_id']?>)"
                                                                                                   alt="Compare" title="Compare"
                                                                                                   width="16" height="16"></div>
<?endforeach; endif?>
	<!-- END products --> </div>
</div>
</div>
</div>
<div class="wrap-footer">
	<div class="container_16 footer">
		<div class="grid_12 alpha">
			<div style="padding: 15px;"><a href="http://mikrotik.com/"><img id="footer-logo"
			                                                                src="<?=ASSETS_URL?>img/mtlogo-footer.png"
			                                                                alt="mikrotik" width="100" height="24"></a></div>
		</div>
		<div class="grid_4 omega">
			<div style="padding: 15px;">e-mail: sales@mikrotik.com</div>
		</div>
	</div>
</div>
<div id="cboxOverlay" style="display: none;"></div>
<div id="colorbox" class="" style="display: none;">
	<div id="cboxWrapper">
		<div>
			<div id="cboxTopLeft" style="float: left;"></div>
			<div id="cboxTopCenter" style="float: left;"></div>
			<div id="cboxTopRight" style="float: left;"></div>
		</div>
		<div style="clear: left;">
			<div id="cboxMiddleLeft" style="float: left;"></div>
			<div id="cboxContent" style="float: left;">
				<div id="cboxLoadedContent" style="width: 0px; height: 0px; overflow: hidden; float: left;"></div>
				<div id="cboxLoadingOverlay" style="float: left;"></div>
				<div id="cboxLoadingGraphic" style="float: left;"></div>
				<div id="cboxTitle" style="float: left;"></div>
				<div id="cboxCurrent" style="float: left;"></div>
				<div id="cboxNext" style="float: left;"></div>
				<div id="cboxPrevious" style="float: left;"></div>
				<div id="cboxSlideshow" style="float: left;"></div>
				<div id="cboxClose" style="float: left;"></div>
			</div>
			<div id="cboxMiddleRight" style="float: left;"></div>
		</div>
		<div style="clear: left;">
			<div id="cboxBottomLeft" style="float: left;"></div>
			<div id="cboxBottomCenter" style="float: left;"></div>
			<div id="cboxBottomRight" style="float: left;"></div>
		</div>
	</div>
	<div style="position: absolute; width: 9999px; visibility: hidden; display: none;"></div>
</div>
