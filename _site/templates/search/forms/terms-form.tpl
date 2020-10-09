<div class="search-term form-group">
	<label>Search For</label>
	<div class="term input-group">
		<div class="input-group-addon">
			<i class="fa fa-search"></i></i>
		</div>
		<input type="text" class="form-control" placeholder="Term"<% if (typeof term != 'undefined') { %> value="<%= term %>"<% } %> />
	</div>
</div>

<div class="dictionary-name form-group dictionary">
	<label>Dictionary</label>
	<div class="search input-group">
		<div class="input-group-addon">
			<i class="fa fa-book"></i></i>
		</div>
		<input type="text" class="form-control" placeholder="Dictionary Name"<% if (typeof dictionary != 'undefined') { %> value="<%= dictionary %>"<% } %> />
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