<div class="form-horizontal">
	<div class="form-group">
		<label class="col-sm-2 control-label">Search</label>
		<div class="col-sm-10">
			<ul class="categories nav nav-pills">
				<li class="snippets" role="presentation"><a href="../search.html?category=snippets">Snippets</a></li>
				<li class="articles" role="presentation"><a href="../search.html?category=articles">Articles</a></li>
				<li class="journals" role="presentation"><a href="../search.html?category=journals">Journals</a></li>
				<li class="publishers" role="presentation"><a href="../search.html?category=publishers">Publishers</a></li>
			</ul>
		</div>
	</div>
</div>

<div class="search-form"></div>

<div class="num-results form-group">
	<label style="width:100%">Number of Results</label>
	<div class="search input-group" style="width:1px">
		<div class="input-group-addon">
			<i class="fa fa-hashtag"></i></i>
			<span class="hidden-xs">Max</span>
		</div>
		<input class="max-results form-control" type="number" min="1" max="1000" value="1000" style="width:5em" />
		<div class="input-group-addon">
			<i class="fa fa-file-text"></i></i>
			<span class="hidden-xs">Max Per Page</span>
		</div>
		<input class="max-per-page form-control" type="number" min="1" max="100" value="20" style="width:4em" />
	</div>
</div>

<br />

<button class="search btn btn-lg btn-primary pull-right" type="submit"><i class="fa fa-search"></i>Search</button>