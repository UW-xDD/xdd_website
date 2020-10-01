<div class="article-title form-group">
	<label>Article</label>
	<div class="search input-group">
		<div class="input-group-addon">
			<i class="fa fa-font"></i></i>
		</div>
		<input type="text" class="form-control" placeholder="Article Title"<% if (typeof title != 'undefined') { %> value="<%= title %>"<% } %> />
	</div>
</div>

<div class="author-name form-group">
	<label>Author</label>
	<div class="search input-group">
		<div class="input-group-addon">
			<i class="fa fa-user"></i></i>
		</div>
		<input type="text" class="form-control" placeholder="Author Name"<% if (typeof author != 'undefined') { %> value="<%= author %>"<% } %>/>
	</div>
</div>

<div class="publication-name form-group publishing collapsible collapse">
	<label>Publication</label>
	<div class="search input-group">
		<div class="input-group-addon">
			<i class="fa fa-file"></i></i>
		</div>
		<input type="text" class="form-control" placeholder="Publication Name"<% if (typeof publication != 'undefined') { %> value="<%= publication %>"<% } %> />
	</div>
</div>

<div class="publisher-name form-group publishing collapsible collapse">
	<label>Publisher</label>
	<div class="search input-group">
		<div class="input-group-addon">
			<i class="fa fa-newspaper-o"></i></i>
		</div>
		<input type="text" class="form-control" placeholder="Publisher / Company Name"<% if (typeof publisher != 'undefined') { %> value="<%= publisher %>"<% } %> />
	</div>
</div>

<div class="publication-date form-group date collapsible collapse">
	<label>Publication Date</label>

	<div class="input-group">
		<div class="input-group-addon">
			<i class="fa fa-calendar"></i>After
		</div>
		<input type="date" class="after form-control"<% if (typeof published_after != 'undefined') { %> value="<%= published_after %>"<% } %>/>

		<div class="input-group-addon">
			<i class="fa fa-calendar"></i>Before
		</div>
		<input type="date" class="before form-control"<% if (typeof published_before != 'undefined') { %> value="<%= published_before %>"<% } %> />  
	</div>
</div>

<div class="acquisition-date form-group date collapsible collapse">
	<label>Acquisition Date</label>

	<div class="input-group">
		<div class="input-group-addon">
			<i class="fa fa-calendar"></i>After
		</div>
		<input type="date" class="after form-control"<% if (typeof acquired_after != 'undefined') { %> value="<%= acquired_after %>"<% } %> />

		<div class="input-group-addon">
			<i class="fa fa-calendar"></i>Before
		</div>
		<input type="date" class="before form-control"<% if (typeof acquired_before != 'undefined') { %> value="<%= acquired_before %>"<% } %> />  
	</div>
</div>