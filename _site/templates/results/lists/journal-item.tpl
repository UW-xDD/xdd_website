<% if (typeof journal != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Journal</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= journal %></span>
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

<% if (typeof publisher != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Publisher</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= publisher %></span>
	</div>
</div>
<% } %>

<% if (typeof years_covered != 'undefined') { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">Years Covered</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext">
			<%= years_covered.join(', ') %>
		</span>
	</div>
</div>
<% } %>

<% if (typeof issn != 'undefined' && issn) { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">ISSN</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= issn %></span>
	</div>
</div>
<% } %>

<% if (typeof eissn != 'undefined' && eissn) { %>
<div class="form-group row">
	<label class="col-sm-2 col-form-label">EISSN</label>
	<div class="col-sm-10">
		<span class="form-control-plaintext"><%= eissn %></span>
	</div>
</div>
<% } %>