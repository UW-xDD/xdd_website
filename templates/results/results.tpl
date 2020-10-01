<h1>Results</h1>
<button class="search-again btn btn-lg btn-primary"><i class="fa fa-search"></i><span class="hidden-xs">Search Again</span></button>
<hr />

<h3>
	<label style="margin-right:10px">Search:</label>
	<span class="search-terms"></span>
</h3>

<div class="status well">
	<div class="search-status">
		Searching
		<i class="fa fa-spinner fa-spin" style="margin-left:10px"></i>
	</div>

	<div class="results-status" style="display:none">
		Showing 
		<span class="range">
			<span class="start">0</span>
			<span class="range-end"> to <span class="finish">0</span></span> of 
		</span>
		<span class="count">0</span> results
	</div>
</div>

<div class="results"></div>
<div class="message"></div>

<div class="page-controls form-group">
	<label>Page</label>
	<div class="search input-group">

		<div class="input-group-addon">
			<button class="first btn-sm"><i class="fa fa-fast-backward"></i></button>
		</div>

		<div class="input-group-addon">
			<button class="prev btn-sm"><i class="fa fa-backward"></i></button>
		</div>

		<input class="page-number form-control" type="number" value="1" />

		<div class="input-group-addon"> / </div>

		<input class="num-pages form-control" type="number" readonly />

		<div class="input-group-addon">
			<button class="next btn-sm"><i class="fa fa-forward"></i></button>
		</div>

		<div class="input-group-addon">
			<button class="last btn-sm"><i class="fa fa-fast-forward"></i></button>
		</div>
	</div>
</div>