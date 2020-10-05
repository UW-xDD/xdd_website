<div class="search-terms form-group">
	<label>Search For</label>
	<div class="terms input-group">
		<div class="input-group-addon">
			<i class="fa fa-search"></i></i>
		</div>
		<input type="text" class="form-control" placeholder="Search Terms"<% if (typeof terms != 'undefined') { %> value="<%= terms %>"<% } %> />
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