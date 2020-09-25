<form class="form-horizontal">
	<div class="form-group">
		<label class="col-sm-2 control-label">Search</label>
		<div class="col-sm-10">
			<ul class="categories nav nav-pills">
				<li class="articles" role="presentation"><a href="../search.html?category=articles">Articles</a></li>
				<li class="journals" role="presentation"><a href="../search.html?category=journals">Journals</a></li>
				<li class="publishers" role="presentation"><a href="../search.html?category=publishers">Publishers</a></li>
			</ul>
		</div>
	</div>
</form>

<div class="search-form"></div>

<div class="num-results form-group">
	<label>Num Results</label>
	<div class="search input-group">
		<div class="input-group-addon">
			<i class="fa fa-hash"></i></i>
			Max
		</div>
		<input class="max-results form-control" type="number" value="1000" />
		<div class="input-group-addon">
			<i class="fa fa-hash"></i></i>
			Max Per Page
		</div>
		<input class="max-per-page form-control" type="number" value="10" />
	</div>
</div>

<br />

<button class="search btn btn-lg btn-primary pull-right" type="button"><i class="fa fa-search"></i>Search</button>