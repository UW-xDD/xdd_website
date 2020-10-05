<% if (typeof publisher != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Publisher</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= publisher %></span>
	</div>
</div>
<% } %>

<% if (typeof journals != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Journals</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= journals %></span>
	</div>
</div>
<% } %>

<% if (typeof articles != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Articles</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= articles %></span>
	</div>
</div>
<% } %>
