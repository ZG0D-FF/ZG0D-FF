/**
 * DBMS Master Study Suite - Global Contextual Hover Glossary Engine
 * Lightweight, zero-dependency, accessible floating tooltip.
 */
(function() {
  const glossary = {
    "dbms": "Database Management System: A software suite enabling users to define, construct, manipulate, share, and protect structured data persistently.",
    "rdbms": "Relational Database Management System: A DBMS based on the relational model (Codd, 1970) where data is organized into tables (relations) with mathematical integrity constraints.",
    "ddl": "Data Definition Language: SQL commands (CREATE, ALTER, DROP) that define or alter database schema structures and storage constraints.",
    "dml": "Data Manipulation Language: SQL commands (SELECT, INSERT, UPDATE, DELETE) that query and modify data tuples within existing schemas.",
    "dcl": "Data Control Language: SQL statements (GRANT, REVOKE) used by administrators to manage access privileges and security permissions.",
    "tcl": "Transaction Control Language: SQL commands (COMMIT, ROLLBACK, SAVEPOINT) managing the atomic units of work in database transactions.",
    "schema": "Database Schema (Intension): The overall structural blueprint and integrity constraints of a database, defined once and modified infrequently.",
    "state": "Database State (Extension/Snapshot): The actual collection of data records stored in the database at a specific instant in time.",
    "relation": "Relation: A mathematical set of distinct tuples (rows) adhering to a specified schema. In SQL, represented as a table without inherent row ordering.",
    "tuple": "Tuple: One individual record or row in a relation representing an entity instance, consisting of ordered attribute values.",
    "attribute": "Attribute: A named column property of a relation characterizing an entity, bound to a specific domain of allowable values.",
    "domain": "Domain: The set of allowable atomic (indivisible) scalar values that can appear under a specific attribute column.",
    "degree": "Degree (Arity): The total number of attribute columns composing a relation schema.",
    "cardinality": "Cardinality: The number of tuples currently stored in a relation instance, or the ratio of entity associations (1:1, 1:N, M:N) in a relationship.",
    "superkey": "Superkey: A set of one or more attributes that collectively and uniquely identifies every individual tuple in a relation; may contain redundant attributes.",
    "candidate key": "Candidate Key: A minimal superkey—a set of attributes guaranteeing row uniqueness from which no attribute can be removed without losing uniqueness.",
    "primary key": "Primary Key: The principal candidate key selected by database designers to officially identify tuples and serve as foreign key reference targets.",
    "foreign key": "Foreign Key: An attribute or combination of attributes in a referencing relation whose values must strictly match a primary/candidate key in a referenced relation (or be NULL).",
    "entity integrity": "Entity Integrity Constraint: The fundamental rule that no primary key attribute value can ever be NULL, ensuring every row possesses a distinct identifier.",
    "referential integrity": "Referential Integrity Constraint: A rule requiring that foreign key values in a child table must match an existing primary key value in the referenced parent table, or remain NULL.",
    "data independence": "Data Independence: The capacity to modify schema definitions at a lower level without impacting schemas or application code at higher architectural levels.",
    "physical data independence": "Physical Data Independence: The ability to alter internal storage formats, indexing structures, or file layouts without altering the conceptual schema or user queries.",
    "logical data independence": "Logical Data Independence: The ability to alter the conceptual schema (adding columns, restructuring tables) without breaking existing external user views or application programs.",
    "three-schema architecture": "Three-Schema Architecture: ANSI/SPARC framework dividing database definitions into External (user views), Conceptual (enterprise logical schema), and Internal (physical disk storage).",
    "null": "NULL: A special marker indicating a missing, unknown, or inapplicable attribute value, distinct from zero or empty strings.",
    "selection": "Selection (σ): A unary relational algebra operation that filters a relation to return only rows satisfying a specified Boolean predicate.",
    "projection": "Projection (Π): A unary relational algebra operation that outputs only specified columns, eliminating duplicate rows in pure relational theory.",
    "cartesian product": "Cartesian Product (×): A binary operation combining every tuple of relation R with every tuple of relation S, producing |R| × |S| total rows.",
    "natural join": "Natural Join (⋈): A binary relational operation that pairs tuples from two relations having identical values across all identically-named attributes, projecting common columns once.",
    "outer join": "Outer Join: An extended join operation (LEFT, RIGHT, FULL) that retains non-matching tuples from one or both tables, padding missing attributes with NULLs.",
    "view": "View: A virtual relation defined by an underlying SQL query whose result is dynamically computed on demand rather than stored redundantly on disk.",
    "materialized view": "Materialized View: A query-defined table whose physical result set is stored on disk and refreshed periodically to accelerate expensive query executions.",
    "acid": "ACID Properties: Four guarantees (Atomicity, Consistency, Isolation, Durability) ensuring reliable transaction execution despite system failures or concurrent access.",
    "atomicity": "Atomicity: An ACID guarantee that all operations within a transaction complete successfully, or all changes are completely aborted and undone (all-or-nothing).",
    "consistency": "Consistency: An ACID guarantee that a transaction transforms the database only from one valid state satisfying all integrity constraints to another valid state.",
    "isolation": "Isolation: An ACID guarantee ensuring concurrent transactions execute without interference, as though executing sequentially.",
    "durability": "Durability: An ACID guarantee that once a transaction commits, its modifications are permanently recorded on non-volatile storage and survive system crashes.",
    "transaction": "Transaction: A logical unit of database processing containing one or more SQL operations that must be executed atomically under ACID guarantees.",
    "functional dependency": "Functional Dependency (X → Y): A constraint stating that whenever two tuples agree on attribute set X, they must also agree on attribute set Y.",
    "bcnf": "Boyce-Codd Normal Form (BCNF): A strict normal form where for every non-trivial functional dependency X → Y, X must be a superkey.",
    "3nf": "Third Normal Form (3NF): A normal form requiring 2NF and prohibiting transitive dependencies of non-prime attributes on candidate keys.",
    "b+ tree": "B+ Tree: A balanced multiway search tree used in database indexing where all keys reside in leaf nodes linked sequentially for fast range scans.",
    "clustered index": "Clustered Index: An index whose physical leaf order matches the physical on-disk storage order of the underlying data table (at most one per table).",
    "unclustered index": "Unclustered (Secondary) Index: An index whose leaf nodes store pointers to records rather than the actual physical table records.",
    "authorization": "Authorization: The determination and enforcement of which authenticated database users possess privileges (SELECT, INSERT, UPDATE, DELETE) on specific relations.",
    "grant": "GRANT: SQL statement awarding specific access permissions on database objects to users or roles.",
    "revoke": "REVOKE: SQL statement removing previously granted privileges from users or roles."
  };

  function initGlossary() {
    let tooltip = document.querySelector('.glossary-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('div');
      tooltip.className = 'glossary-tooltip';
      tooltip.setAttribute('role', 'tooltip');
      tooltip.setAttribute('aria-hidden', 'true');
      document.body.appendChild(tooltip);
    }

    let activeEl = null;

    function showTooltip(el) {
      const rawTerm = el.getAttribute('data-term') || el.textContent;
      const key = rawTerm.trim().toLowerCase();
      const def = glossary[key] || el.getAttribute('title');
      if (!def) return;

      activeEl = el;
      tooltip.innerHTML = `<span class="glossary-tooltip-term">${rawTerm.trim()}</span>${def}`;
      tooltip.classList.add('visible');
      tooltip.setAttribute('aria-hidden', 'false');

      positionTooltip(el);
    }

    function positionTooltip(el) {
      const rect = el.getBoundingClientRect();
      const tipRect = tooltip.getBoundingClientRect();
      const margin = 8;

      let top = rect.bottom + margin;
      if (top + tipRect.height > window.innerHeight && rect.top - tipRect.height - margin > 0) {
        top = rect.top - tipRect.height - margin;
      }

      let left = rect.left + (rect.width / 2) - (tipRect.width / 2);
      if (left < 10) left = 10;
      if (left + tipRect.width > window.innerWidth - 10) {
        left = window.innerWidth - tipRect.width - 10;
      }

      tooltip.style.top = `${Math.round(top)}px`;
      tooltip.style.left = `${Math.round(left)}px`;
    }

    function hideTooltip() {
      if (!tooltip) return;
      tooltip.classList.remove('visible');
      tooltip.setAttribute('aria-hidden', 'true');
      activeEl = null;
    }

    document.querySelectorAll('dfn[data-term]').forEach(el => {
      el.setAttribute('tabindex', '0');
      el.addEventListener('mouseenter', () => showTooltip(el));
      el.addEventListener('mouseleave', () => hideTooltip());
      el.addEventListener('focus', () => showTooltip(el));
      el.addEventListener('blur', () => hideTooltip());
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        if (activeEl === el) hideTooltip();
        else showTooltip(el);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideTooltip();
    });

    document.addEventListener('click', (e) => {
      if (activeEl && !activeEl.contains(e.target) && !tooltip.contains(e.target)) {
        hideTooltip();
      }
    });

    window.addEventListener('scroll', () => {
      if (activeEl) positionTooltip(activeEl);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlossary);
  } else {
    initGlossary();
  }
})();
