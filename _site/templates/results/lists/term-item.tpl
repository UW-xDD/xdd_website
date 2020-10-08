<% if (typeof dict_name != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Dictionary</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= dict_name %></span>
	</div>
</div>
<% } %>

<% if (typeof n_docs != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Documents</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= n_docs %></span>
	</div>
</div>
<% } %>

<% if (typeof n_hits != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Hits</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= n_hits %></span>
	</div>
</div>
<% } %>

<% if (typeof n_pubs != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Publications</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= n_pubs %></span>
	</div>
</div>
<% } %>

<% if (typeof n_sources != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Sources</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= n_sources %></span>
	</div>
</div>
<% } %>

