<div class="search-terms form-group">
	<label>Search For</label>
	<div class="terms input-group">
		<div class="input-group-addon">
			<i class="fa fa-search"></i></i>
		</div>
		<input type="text" class="form-control" placeholder="Search Terms"<% if (typeof terms != 'undefined') { %> value="<%= terms %>"<% } %> />
	</div>
</div>