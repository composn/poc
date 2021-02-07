import AccessControl from 'role-acl';

class AC extends AccessControl {
  extendsFromTree(tree) {
    if (tree.parents && Array.isArray(tree.parents)) {
      tree.parents.forEach((parent) => {
        this.extendRoleSync(parent.name, tree.name);
        this.extendsFromTree(parent);
      });
    }
  }

  addGrantsFromList(grants = []) {
    grants.forEach((grant) => {
      let pipeline = this.grant(grant.role);
      if (grant.action) {
        pipeline = pipeline.execute(grant.action);
      }
      if (grant.condition) {
        pipeline = pipeline.condition(grant.condition);
      }
      if (grant.resource) {
        if (grant.attributes) {
          pipeline = pipeline.on(grant.resource, grant.attributes);
        }
        pipeline.on(grant.resource);
      }
    });
  }
}

const ac = new AC();
export default ac;
