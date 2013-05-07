<?php

class products {
	function index(){
		global $request;
		$this->scripts[]='products.js';
		if (isset($_POST['id'])){
			$group_id = $_POST['id'];
			if ($group_id==0){
				$products = get_all("SELECT * FROM product NATURAL JOIN `group` NATURAL JOIN image WHERE deleted=0");
				$products = json_encode($products, true);
				ob_end_clean();
				exit($products);
			} else {
				$products = get_all("SELECT * FROM product NATURAL JOIN `group` NATURAL JOIN image WHERE group_id='$group_id' AND deleted=0");
				$products = json_encode($products, true);
				ob_end_clean();
				exit($products);
			}
		}
		$groups = get_all("SELECT * FROM `group`");

		// Lisa All goups loetellu
		array_unshift($groups, array('group_id'=>0, 'group_name'=>"All"));
		$products = get_all("SELECT * FROM product NATURAL JOIN `group` NATURAL JOIN image WHERE deleted=0");
		require 'views/master_view.php';
	}
}