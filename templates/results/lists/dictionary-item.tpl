<% if (typeof name != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Dictionary</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= name %></span>
	</div>
</div>
<% } %>

<% if (typeof base_classification != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Classification</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= base_classification %></span>
	</div>
</div>
<% } %>

