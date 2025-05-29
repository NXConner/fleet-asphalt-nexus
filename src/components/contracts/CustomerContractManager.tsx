<select
  title="Contract Type"
  aria-label="Contract Type"
  className="w-full p-2 border rounded"
  value={editingContract.contractType}
  onChange={(e) => setEditingContract({...editingContract, contractType: e.target.value as any})}
>
  <option value="service">Service Agreement</option>
  <option value="maintenance">Maintenance Contract</option>
  <option value="project">Project Contract</option>
  <option value="master">Master Agreement</option>
</select> 