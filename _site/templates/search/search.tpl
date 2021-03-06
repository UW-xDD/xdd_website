<div class="form-horizontal">

	<div class="categories form-group">
		<label class="col-sm-2 control-label">Search</label>
		<div class="col-sm-10">
			<ul class="categories nav nav-pills">
				<li class="snippets" role="presentation"><a>Snippets</a></li>
				<li class="articles" role="presentation"><a>Articles</a></li>
				<li class="journals" role="presentation"><a>Journals</a></li>
				<li class="publishers" role="presentation"><a>Publishers</a></li>
				<li class="terms" role="presentation"><a>Terms</a></li>
				<li class="dictionaries" role="presentation"><a>Dictionaries</a></li>
			</ul>
		</div>
	</div>
</div>

<div class="search-form"></div>

<div class="num-results collapsible collapse form-group">
	<label>Number of Results</label>
	<div>
		<div style="display:inline-block">
			<div class="search input-group" style="width:1px">
				<div class="input-group-addon">
					<i class="fa fa-hashtag"></i></i>
					<span class="hidden-xs">Max</span>
				</div>
				<input class="max-results form-control" type="number" min="1" max="1000"<% if (typeof max != 'undefined') { %> value="<%= max %>"<% } %> style="width:5em" />

				<div class="input-group-addon">
					<i class="fa fa-file-text"></i></i>
					<span class="hidden-xs">Max / Page</span>
				</div>
				<input class="max-per-page form-control" type="number" min="1" max="100"<% if (typeof max_per_page != 'undefined') { %> value="<%= max_per_page %>"<% } %> style="width:4em" />
			</div>
		</div>
	</div>
</div>

<div class="options" style="float:left; padding:2px">
	<label>Options</label>
	<div class="buttons">
		<button class="publishing expander btn btn-sm" data-toggle="tooltip" aria-expanded="false" aria-controls="collapse" data-toggle="tooltip" title="Publishing">
		  <i class="fa fa-newspaper-o"></i>
		</button>

		<button class="dates expander btn btn-sm" data-toggle="tooltip" aria-expanded="false" aria-controls="collapse" data-toggle="tooltip" title="Dates">
		  <i class="fa fa-calendar"></i>
		</button>

		<button class="limits expander btn btn-sm" data-toggle="tooltip" aria-expanded="false" aria-controls="collapse" data-toggle="tooltip" title="Number of Results">
		  <i class="fa fa-hashtag"></i>
		</button>
	</div>
</div>

<br />

<button class="search btn btn-lg btn-primary pull-right" type="submit"><i class="fa fa-search"></i>Search</button>